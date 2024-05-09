import prisma from "./prismaClient";

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

export { updateGEventId };
