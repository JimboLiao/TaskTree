import { Server } from "socket.io";
import { User } from "../../config/type";
import { CustomSocket } from "./index";
import * as chatroomToUserEntity from "../entities/chatroomToUser";
import * as messageEntity from "../entities/message";
import { NotFoundError } from "../utils/errors/customErrors";

export const handleJoinRoom = (socket: CustomSocket, roomId: string) => {
  socket.join(roomId);
  console.log(`User joined room: ${roomId}`);
};

export const handleLeaveRoom = (socket: CustomSocket, roomId: string) => {
  socket.leave(roomId);
  console.log(`User left room: ${roomId}`);
};

export const handleDisconnect = (socket: CustomSocket) => {
  console.log("user disconnected");
};

export const handleRegister = (socket: CustomSocket, userData: User) => {
  socket.userData = userData;
  console.log("User registered:", socket.userData);
};

const createMessageInRoom = async ({
  roomId,
  userId,
  content,
}: {
  roomId: number;
  userId: number;
  content: string;
}) => {
  const chatroomToUser = await chatroomToUserEntity.getChatroomToUser({
    chatroomId: roomId,
    userId,
  });
  if (!chatroomToUser) {
    throw new NotFoundError("Not Found");
  }

  const newMessage = await messageEntity.createMessage({
    chatroomToUserId: chatroomToUser.id,
    content,
  });

  return newMessage;
};

export const handleChatMessage = (
  io: Server,
  socket: CustomSocket,
  { roomId, message }: { roomId: string; message: string }
) => {
  if (!socket.userData) {
    return;
  }
  console.log(
    `In rooom ${roomId}, received message from user ${socket.userData?.id}: ${message}`
  );

  // redis/ rabbitMQ
  // add message into database temporarly
  createMessageInRoom({
    roomId: parseInt(roomId, 10),
    userId: socket.userData.id,
    content: message,
  }).then((newMessage) => {
    io.to(roomId).emit("chat message", {
      id: newMessage.id,
      chatroomId: roomId,
      userId: socket.userData?.id,
      username: socket.userData?.username || socket.userData?.email,
      content: newMessage.content,
      createTime: newMessage.createTime,
    });
  });
};
