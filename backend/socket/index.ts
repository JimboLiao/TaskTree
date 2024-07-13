import { Server, Socket } from "socket.io";
import {
  handleJoinRoom,
  handleLeaveRoom,
  handleDisconnect,
  handleChatMessage,
  handleRegister,
} from "./chatroomSocket";
import { User } from "../../config/type";

export interface CustomSocket extends Socket {
  userData?: User;
}

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // Setup event handlers
    socket.on("join room", (roomId) => handleJoinRoom(socket, roomId));
    socket.on("register", (userData) => handleRegister(socket, userData));
    socket.on("leave room", (roomId) => handleLeaveRoom(socket, roomId));
    socket.on("disconnect", () => handleDisconnect(socket));
    socket.on("chat message", (data) => handleChatMessage(io, socket, data));
  });
};
