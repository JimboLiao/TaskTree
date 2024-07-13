import prisma from "./prismaClient";

const createChatroomUsers = async ({
  userIds,
  chatroomId,
}: {
  userIds: number[];
  chatroomId: number;
}) => {
  const chatroomToUser = await prisma.chatroomToUser.createMany({
    data: userIds.map((userId) => ({ chatroomId: chatroomId, userId: userId })),
  });
  return chatroomToUser;
};

const getChatroomToUser = async ({
  chatroomId,
  userId,
}: {
  chatroomId: number;
  userId: number;
}) => {
  const chatroomToUser = await prisma.chatroomToUser.findFirst({
    where: {
      chatroomId: chatroomId,
      userId: userId,
    },
  });
  return chatroomToUser;
};

export { createChatroomUsers, getChatroomToUser };
