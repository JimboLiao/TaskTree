import express from "express";
import authJWT from "../middlewares/authJWT";
import * as chatroomController from "../controllers/chatroom";
import { checkBodyParams } from "../utils/checkParams";

const router = express.Router();

router.post(
  "/",
  authJWT,
  checkBodyParams(["name"]),
  chatroomController.createChatroom
);
router.get("/", authJWT, chatroomController.getChatrooms);
router.get("/:chatroomId", authJWT, chatroomController.getChatroom);

router.post(
  "/:chatroomId/users",
  authJWT,
  checkBodyParams(["emails"]),
  chatroomController.createChatroomUsers
);
router.get(
  "/:chatroomId/messages",
  authJWT,
  chatroomController.getRoomHistoryMessages
);
export default router;
