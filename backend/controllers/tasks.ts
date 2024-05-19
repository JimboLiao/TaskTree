import { NextFunction, Request, Response } from "express";
import * as taskEntity from "../entities/task";
import * as userEntity from "../entities/users";
import * as categoryEntity from "../entities/category";
import * as taskOfUserEntity from "../entities/taskOfUser";
import * as googleAPI from "../google/googleAPI";
import * as parse from "../utils/parseFunctions";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../utils/errors/customErrors";
import { Task } from "@prisma/client";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.id;
    const { task, categoryId, resources } = req.body;
    const newTask = await taskEntity.createTask({
      task,
      userId,
      categoryId,
      resources,
    });

    res.status(201).json({ status: "success", data: newTask });
  } catch (err) {
    next(err);
  }
};

const getTasksInRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { start, end } = req.query as { start: string; end: string };
    if (!start || !end) {
      throw new BadRequestError(
        "Missing required query parameters: start and end"
      );
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    const userId = res.locals.id;
    const tasks = await taskEntity.getTasksInRange({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      userId,
    });
    res.status(200).json({ status: "success", data: tasks });
  } catch (err) {
    next(err);
  }
};

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.id;
    const tasks = await taskEntity.getAllTasks(userId);
    res.status(200).json({ status: "success", data: tasks });
  } catch (err) {
    next(err);
  }
};

const getTaskDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const taskId = parseInt(req.params.id, 10);
    const task = await taskEntity.getTaskById(taskId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // check if task's attendee includes current user
    const isAttendee = task.attendee.some(
      (attendee) => attendee.user.id === userId
    );
    if (!isAttendee) {
      throw new ForbiddenError("Forbidden");
    }

    res.status(200).json({ status: "success", data: task });
  } catch (err) {
    next(err);
  }
};

const syncTasksToGoogleCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const refreshToken = await userEntity.getRefreshTokenByUserId(userId);
    if (!refreshToken) {
      throw new NotFoundError("Refresh token not found");
    }

    await syncCategoriesToGoogleCalendars(userId, refreshToken);
    await syncTasksToCalendars(userId, refreshToken);

    res.status(200).json({ status: "success", message: "Synced successfully" });
  } catch (err) {
    next(err);
  }
};

async function syncCategoriesToGoogleCalendars(
  userId: number,
  refreshToken: string
) {
  const unsyncCategories = await categoryEntity.getUnsynchronizedCategories(
    userId
  );

  console.log("unsyncCategories", unsyncCategories);

  if (unsyncCategories.length > 0) {
    const categoryPromises = unsyncCategories.map((category) =>
      syncCategoryToCalendar(category, refreshToken, userId)
    );
    await Promise.all(categoryPromises);
  }
}

async function syncCategoryToCalendar(
  category: {
    id: number;
    name: string;
    color: string;
    gCalendarId: string | null;
  },
  refreshToken: string,
  userId: number
) {
  const calendarInfo = parse.categoryToCalendar(category);
  const response = await googleAPI.insertCalendar({
    refreshToken,
    calendarInfo,
  });

  if (!response?.id) {
    throw new Error("Failed to create calendar");
  }
  // Update category with new Google Calendar ID after the calendar is created
  await categoryEntity.updateCategory({
    category: { ...category, gCalendarId: response.id },
    userId,
  });
}

async function syncTasksToCalendars(userId: number, refreshToken: string) {
  const tasks = await taskEntity.getAllTasks(userId, true);
  const taskPromises = tasks.map((task) => {
    console.log("task", task);
    const { category, attendee, ...restTask } = task;
    let gCalendarId = category[0].gCalendarId;
    if (!gCalendarId) {
      throw new Error(`Create calendar ${category[0].name} first`);
    }
    return syncEventToCalendar({
      task: restTask,
      attendee: attendee[0],
      gCalendarId,
      refreshToken,
    });
  });
  await Promise.all(taskPromises);
}

async function syncEventToCalendar({
  task,
  attendee,
  gCalendarId,
  refreshToken,
}: {
  task: Task;
  attendee: { id: number; gEventId: string | null };
  gCalendarId: string;
  refreshToken: string;
}) {
  const eventInfo = parse.taskToEvent(task);
  if (attendee.gEventId) {
    await googleAPI.deleteEvent({
      refreshToken,
      calendarId: gCalendarId,
      eventId: attendee.gEventId,
    });
  }
  const response = await googleAPI.insertEvent({
    refreshToken,
    calendarId: gCalendarId,
    eventInfo,
  });
  if (!response?.id) {
    throw new Error("Failed to create event");
  }
  return taskOfUserEntity.updateGEventId(attendee.id, response.id);
}

const importTasksFromGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const categoryId = parseInt(req.params.categoryId, 10);
    const category = await categoryEntity.getCategory(userId, categoryId);
    if (!category?.gCalendarId) {
      throw new NotFoundError(
        "Cannot found calendar corresponding to category"
      );
    }
    const refreshToken = await userEntity.getRefreshTokenByUserId(userId);
    if (!refreshToken) {
      throw new NotFoundError("Refresh token not found");
    }

    const { start, end } = req.query as { start: string; end: string };
    if (!start || !end) {
      throw new BadRequestError(
        "Missing required query parameters: start and end"
      );
    }

    const data = await googleAPI.listEvent({
      refreshToken,
      calendarId: category.gCalendarId,
      timeMax: end,
      timeMin: start,
    });
    if (!data) {
      throw new Error("Failed to get events from google calendar");
    }

    const events = data.items;
    if (!events?.length) {
      return res
        .status(200)
        .json({ status: "success", message: "Nothing to import" });
    }

    const promises = [];
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const newTask = parse.eventToTask(event);
      if (!event.id) {
        throw new Error("Event id is missing");
      }

      promises.push(
        taskOfUserEntity
          .getTaskOfUserByGEventId(event.id)
          .then((taskOfUser) => {
            if (!taskOfUser) {
              promises.push(
                taskEntity.createTask({
                  task: newTask,
                  userId,
                  categoryId,
                  gEventId: event.id,
                })
              );
            } else {
              promises.push(
                taskEntity.updateTask({
                  taskId: taskOfUser.taskId,
                  task: newTask,
                })
              );
            }
          })
      );
    } // for loop

    await Promise.all(promises);
    return res
      .status(200)
      .json({ status: "success", message: "Imported successfully" });
  } catch (err) {
    next(err);
  }
};

export {
  createTask,
  getTasksInRange,
  getAllTasks,
  getTaskDetail,
  syncTasksToGoogleCalendar,
  importTasksFromGoogle,
};
