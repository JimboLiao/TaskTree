import prisma from "./prismaClient";

const createMessage = async ({
  chatroomToUserId,
  content,
}: {
  chatroomToUserId: number;
  content: string;
}) => {
  const message = await prisma.message.create({
    data: {
      chatroomToUserId: chatroomToUserId,
      content: content,
      createTime: new Date(),
    },
  });
  return message;
};

const getRoomHistoryMessages = async (chatroomId: number) => {
  const messages = await prisma.message.findMany({
    where: {
      chatroomToUser: {
        chatroomId: chatroomId,
      },
    },
    select: {
      id: true,
      content: true,
      createTime: true,
      chatroomToUser: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              createTime: true,
              updateTime: true,
            },
          },
          chatroomId: true,
        },
      },
    },
    orderBy: {
      createTime: "asc",
    },
  });
  return messages;
};

export { createMessage, getRoomHistoryMessages };
