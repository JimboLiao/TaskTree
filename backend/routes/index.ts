import express from "express";
import userRouter from "./users";
import taskRouter from "./tasks";
import categoryRouter from "./category";
import resourceRouter from "./resource";
const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/categories", categoryRouter);
router.use("/resources", resourceRouter);

export default router;
