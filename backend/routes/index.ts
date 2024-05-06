import express from "express";
import userRouter from "./users";
import taskRouter from "./tasks";
import categoryRouter from "./category";
const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/categories", categoryRouter);

export default router;
