import prisma from "./prismaClient";

export type TaskStatus = "TODO" | "DOING" | "DONE";
export type TaskImportance = "LOW" | "NORMAL" | "HIGH";

export interface Task {
  title?: string | null;
  start: Date;
  end: Date;
  description?: string | null;
  isAllDay?: boolean;
  status?: TaskStatus;
  importance?: TaskImportance;
  reminder?: number | null;
  parentTaskId?: number | null;
  location?: string | null;
  createTime?: Date;
  updateTime?: Date;
}

const createTask = async ({
  task,
  userId,
  categoryId,
  resources,
  gEventId,
}: {
  task: Task;
  userId: number;
  categoryId: number;
  resources?: { content: string }[];
  gEventId?: string | null;
}) => {
  const date = new Date();
  let res = undefined;
  if (resources != undefined) {
    res = {
      createMany: {
        data: resources,
      },
    };
  }
  let att = gEventId
    ? {
        create: {
          userId: userId,
          gEventId: gEventId,
        },
      }
    : {
        create: {
          userId: userId,
        },
      };

  const newTask = await prisma.task.create({
    data: {
      ...task,
      createTime: date,
      updateTime: date,
      attendee: att,
      category: {
        connect: {
          id: categoryId,
        },
      },
      resources: res,
    },
    include: {
      attendee: { select: { userId: true } },
      category: { select: { id: true, name: true, color: true } },
      resources: true,
    },
  });
  return newTask;
};

const getTasksInRange = async ({
  start,
  end,
  userId,
}: {
  start: string;
  end: string;
  userId: number;
}) => {
  const tasks = await prisma.task.findMany({
    where: {
      start: {
        lte: end,
      },
      end: {
        gte: start,
      },
      attendee: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      category: { select: { id: true, name: true, color: true } },
      resources: true,
    },
  });
  return tasks;
};

const getAllTasks = async (
  userId: number,
  isIncludeGoogleId: boolean = false
) => {
  const tasks = await prisma.task.findMany({
    where: {
      attendee: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      category: {
        where: { userId: userId },
        select: {
          id: true,
          name: true,
          color: true,
          gCalendarId: isIncludeGoogleId,
        },
      },
      attendee: {
        where: { userId: userId },
        select: { gEventId: isIncludeGoogleId, id: true },
      },
    },
  });
  return tasks;
};

const getTaskById = async (taskId: number) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      attendee: {
        include: {
          user: { select: { id: true, username: true, email: true } },
        },
      },
      category: { select: { id: true, name: true, color: true } },
    },
  });

  return task;
};

const updateTask = async ({
  taskId,
  task,
  taskOfUserId,
  gEventId,
}: {
  taskId: number;
  task: Task;
  taskOfUserId?: number;
  gEventId?: string | null;
}) => {
  let att =
    taskOfUserId && gEventId
      ? {
          update: {
            where: {
              id: taskOfUserId,
            },
            data: {
              gEventId: gEventId,
            },
          },
        }
      : undefined;
  const newTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...task,
      attendee: att,
    },
  });
  return newTask;
};

export { createTask, getTasksInRange, getAllTasks, getTaskById, updateTask };
