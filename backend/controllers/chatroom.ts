import { NextFunction, Request, Response } from "express";
import { ForbiddenError, NotFoundError } from "../utils/errors/customErrors";
import * as chatroomEntity from "../entities/chatroom";
import * as chatroomToUserEntity from "../entities/chatroomToUser";
import * as userEntity from "../entities/users";
import * as messageEntity from "../entities/message";

const createChatroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const userId = res.locals.id;
    const newRoom = await chatroomEntity.createChatroom({ name, userId });
    res.status(201).json({ status: "success", data: newRoom });
  } catch (err) {
    next(err);
  }
};

const getChatrooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const chatrooms = await chatroomEntity.getChatrooms(userId);
    res.status(200).json({ status: "success", data: chatrooms });
  } catch (err) {
    next(err);
  }
};

const createChatroomUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatroomId = parseInt(req.params.chatroomId, 10);
    const { emails } = req.body;
    const userId = res.locals.id;
    const chatroomToUser = await chatroomToUserEntity.getChatroomToUser({
      chatroomId,
      userId,
    });
    if (!chatroomToUser) {
      throw new ForbiddenError("Forbidden user");
    }

    const userIds = await Promise.all(
      emails.map(async (email: string) => {
        const user = await userEntity.getUserByEmail(email);
        if (!user) {
          throw new NotFoundError("User not found");
        }
        return user.id;
      })
    );

    const newUsers = await chatroomToUserEntity.createChatroomUsers({
      userIds,
      chatroomId,
    });
    res.status(201).json({ status: "success", data: newUsers });
  } catch (err) {
    next(err);
  }
};

const getChatroom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatroomId = parseInt(req.params.chatroomId, 10);
    const userId = res.locals.id;
    //check if user is in the chatroom
    const chatroomToUser = await chatroomToUserEntity.getChatroomToUser({
      chatroomId,
      userId,
    });
    if (!chatroomToUser) {
      throw new ForbiddenError("Forbidden user");
    }

    //check if chatroom exists
    const chatroom = await chatroomEntity.getChatroom(chatroomId);
    if (!chatroom) {
      throw new NotFoundError("Chatroom not found");
    }

    res.status(200).json({ status: "success", data: chatroom });
  } catch (err) {
    next(err);
  }
};

const getRoomHistoryMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const roomId = parseInt(req.params.chatroomId, 10);
    const chatroomToUser = await chatroomToUserEntity.getChatroomToUser({
      chatroomId: roomId,
      userId,
    });
    if (!chatroomToUser) {
      throw new NotFoundError("Not Found");
    }
    const messages = await messageEntity.getRoomHistoryMessages(roomId);
    res.status(200).json({ status: "success", data: messages });
  } catch (err) {
    next(err);
  }
};

export {
  createChatroom,
  getChatrooms,
  createChatroomUsers,
  getChatroom,
  getRoomHistoryMessages,
};
