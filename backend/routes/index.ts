import express from "express";
import userRouter from "./users";
import taskRouter from "./tasks";
import categoryRouter from "./category";
import resourceRouter from "./resource";
import chatRoomRouter from "./chatroom";
const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/categories", categoryRouter);
router.use("/resources", resourceRouter);
router.use("/chatrooms", chatRoomRouter);

export default router;
