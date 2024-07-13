import prisma from "./prismaClient";

const createChatroom = async ({
  name,
  userId,
}: {
  name: string;
  userId: number;
}) => {
  const date = new Date();
  const chatroom = await prisma.chatroom.create({
    data: {
      name: name,
      chatroomToUser: {
        create: {
          userId: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
  return chatroom;
};

const getChatrooms = async (userId: number) => {
  const chatrooms = await prisma.chatroom.findMany({
    where: {
      chatroomToUser: {
        some: {
          userId: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
  return chatrooms;
};

const getChatroom = async (id: number) => {
  const chatroom = await prisma.chatroom.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return chatroom;
};

export { createChatroom, getChatrooms, getChatroom };
