import prisma from "./prismaClient";

export type TaskStatus = "TODO" | "DOING" | "DONE";
export type TaskImportance = "LOW" | "NORMAL" | "HIGH";

interface CreateTask {
  title?: string | null;
  start: Date | string;
  end: Date | string;
  description?: string | null;
  isAllDay?: boolean;
  status?: TaskStatus;
  importance?: TaskImportance;
  reminder?: number | null;
  parentTaskId?: number | null;
  location?: string | null;
  gEventId?: string | null;
}

const createTask = async ({
  task,
  userId,
  categoryId,
  resources,
}: {
  task: CreateTask;
  userId: number;
  categoryId: number;
  resources: { content: string }[];
}) => {
  const date = new Date();
  const newTask = await prisma.task.create({
    data: {
      ...task,
      createTime: date,
      updateTime: date,
      attendee: {
        create: {
          userId: userId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      resources: {
        createMany: {
          data: resources,
        },
      },
    },
    include: {
      attendee: { select: { userId: true } },
      category: true,
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
      category: true,
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
      category: true,
    },
  });

  return task;
};

const updateTask = async ({
  taskId,
  task,
  userId,
}: {
  taskId: number;
  task: CreateTask;
  userId: number;
}) => {
  const newTask = await prisma.task.update({
    where: {
      id: taskId,
      attendee: {
        some: {
          userId: userId,
        },
      },
    },
    data: {
      ...task,
    },
  });
  return newTask;
};

export { createTask, getTasksInRange, getAllTasks, getTaskById, updateTask };
