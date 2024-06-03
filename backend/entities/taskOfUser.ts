import prisma from "./prismaClient";

const createTaskOfUser = async ({
  taskId,
  userId,
}: {
  taskId: number;
  userId: number;
}) => {
  const newTaskOfUser = await prisma.taskOfUser.create({
    data: {
      taskId: taskId,
      userId: userId,
    },
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
  });

  return newTaskOfUser;
};

const getTaskOfUserByGEventId = async (gEventId: string) => {
  const task = await prisma.taskOfUser.findUnique({
    where: {
      gEventId: gEventId,
    },
  });
  return task;
};

const updateGEventId = async (id: number, gEventId: string) => {
  return await prisma.taskOfUser.update({
    where: {
      id: id,
    },
    data: {
      gEventId: gEventId,
    },
  });
};

const deleteTaskOfUser = async (id: number) => {
  await prisma.taskOfUser.delete({
    where: {
      id: id,
    },
  });

  return;
};

export {
  createTaskOfUser,
  getTaskOfUserByGEventId,
  updateGEventId,
  deleteTaskOfUser,
};
