import prisma from "./prismaClient";

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

export { getTaskOfUserByGEventId, updateGEventId };
