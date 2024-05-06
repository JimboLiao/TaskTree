import prisma from "./prismaClient";

type TaskStatus = "TODO" | "DOING" | "DONE";
type TaskImportance = "LOW" | "NORMAL" | "HIGH";

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
        connect: {
          id: userId,
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
      attendee: { select: { id: true } },
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
          id: userId,
        },
      },
    },
    include: {
      attendee: { select: { id: true } },
      category: true,
      resources: true,
    },
  });
  return tasks;
};

const getAllTasks = async (userId: number) => {
  const tasks = await prisma.task.findMany({
    where: {
      attendee: {
        some: {
          id: userId,
        },
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
      attendee: { select: { id: true } },
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
          id: userId,
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
