import { getUncategorized } from "./category";
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
  categoryId: number | null;
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

  let cate = undefined;
  if (!categoryId) {
    // if not provide categoryId, create/connect to uncategorized
    const uncategorized = await getUncategorized(userId);
    if (!uncategorized) {
      cate = {
        create: {
          name: "Uncategorized",
          userId: userId,
        },
      };
    } else {
      cate = {
        connect: {
          id: uncategorized.id,
        },
      };
    }
  } else {
    // cconnect to provided categoryId
    cate = {
      connect: {
        id: categoryId,
      },
    };
  }
  const newTask = await prisma.task.create({
    data: {
      ...task,
      createTime: date,
      updateTime: date,
      attendee: att,
      category: cate,
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
        lt: end,
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

const getTaskById = async (taskId: number, userId: number) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      attendee: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      attendee: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              createTime: true,
              updateTime: true,
            },
          },
        },
      },
      category: {
        where: { userId: userId },
        select: { id: true, name: true, color: true },
      },
      resources: { select: { id: true, content: true } },
    },
  });

  return task;
};

const updateTask = async ({ taskId, task }: { taskId: number; task: Task }) => {
  const newTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...task,
    },
  });
  return newTask;
};

const connectTaskCategoryRelation = async ({
  taskId,
  categoryId,
}: {
  taskId: number;
  categoryId: number;
}) => {
  const newTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    select: {
      category: { select: { id: true, name: true, color: true } },
    },
  });
  return newTask;
};

const disconnectTaskCategoryRelation = async ({
  taskId,
  categoryId,
}: {
  taskId: number;
  categoryId: number;
}) => {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      category: {
        disconnect: {
          id: categoryId,
        },
      },
    },
  });
  return;
};

const updateTaskCategoryRelation = async ({
  taskId,
  oldCategoryId,
  newCategoryId,
}: {
  taskId: number;
  oldCategoryId: number;
  newCategoryId: number;
}) => {
  const newTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      category: {
        connect: {
          id: newCategoryId,
        },
        disconnect: {
          id: oldCategoryId,
        },
      },
    },
    select: {
      category: { select: { id: true, name: true, color: true } },
    },
  });
  return newTask;
};

const addTaskAttendee = async ({
  taskId,
  userId,
  newUserId,
}: {
  taskId: number;
  userId: number;
  newUserId: number;
}) => {
  const newAttendee = await prisma.task.update({
    where: {
      id: taskId,
      attendee: {
        some: {
          userId: userId,
        },
      },
    },
    data: {
      attendee: {
        create: {
          userId: newUserId,
        },
      },
    },
    select: {
      attendee: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              createTime: true,
              updateTime: true,
            },
          },
        },
        where: { userId: newUserId },
      },
    },
  });

  return newAttendee;
};

const deleteTaskAttendee = async ({
  taskId,
  userId,
}: {
  taskId: number;
  userId: number;
}) => {
  const newAttendee = await prisma.task.update({
    where: {
      id: taskId,
      attendee: {
        some: {
          userId: userId,
        },
      },
    },
    data: {
      attendee: {
        delete: {
          id: userId,
          userId: userId,
        },
      },
    },
  });
  return newAttendee;
};

export {
  createTask,
  getTasksInRange,
  getAllTasks,
  getTaskById,
  updateTask,
  connectTaskCategoryRelation,
  disconnectTaskCategoryRelation,
  updateTaskCategoryRelation,
  addTaskAttendee,
};
