import { NextFunction, Request, Response } from "express";
import * as taskEntity from "../entities/task";
import * as userEntity from "../entities/users";
import * as categoryEntity from "../entities/category";
import * as taskOfUserEntity from "../entities/taskOfUser";
import * as googleAPI from "../google/googleAPI";
import * as parse from "../utils/parseFunctions";
import { BadRequestError, NotFoundError } from "../utils/errors/customErrors";

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

const syncTasksToGoogleCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;

    // get all tasks and refresh token of the user
    const tasks = await taskEntity.getAllTasks(userId, true);
    const refreshToken = await userEntity.getRefreshTokenByUserId(userId);
    if (!refreshToken) {
      throw new NotFoundError("Refresh token not found");
    }

    // check gCalendarId exists or not
    const promises = [];
    for (let i = 0; i < tasks.length; i++) {
      const { category, attendee, ...task } = tasks[i];
      let gCalendarId = category[0].gCalendarId || undefined;
      if (!gCalendarId) {
        // if gCalendarId is undefined, create a new calendar
        const calendarInfo = parse.categoryToCalendar(category[0]);
        const response = await googleAPI.insertCalendar({
          refreshToken,
          calendarInfo,
        });
        if (!response?.id) {
          throw new Error("Failed to create calendar");
        }
        gCalendarId = response.id;
        // update gCalendarId to DB
        promises.push(
          categoryEntity.updateCategory({
            category: { ...category[0], gCalendarId },
            userId,
          })
        );
      }

      // sync task to google calendar
      const eventInfo = parse.taskToEvent(task);
      if (attendee[0].gEventId) {
        // if gEventId exists, delete event first
        await googleAPI.deleteEvent({
          refreshToken,
          calendarId: gCalendarId,
          eventId: attendee[0].gEventId,
        });
      }
      // create a new event
      promises.push(
        googleAPI
          .insertEvent({
            refreshToken,
            calendarId: gCalendarId,
            eventInfo: eventInfo,
          })
          .then((response) => {
            if (!response?.id) {
              throw new Error("Failed to create event");
            }
            // update gEventId to DB
            const eventId = response.id;
            promises.push(
              taskOfUserEntity.updateGEventId(attendee[0].id, eventId)
            );
          })
      );
    } // for loop

    await Promise.all(promises);
    return res
      .status(200)
      .json({ status: "success", message: "Synced successfully" });
  } catch (err) {
    next(err);
  }
};

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
  syncTasksToGoogleCalendar,
  importTasksFromGoogle,
};
