import express from "express";
import userRouter from "./users";
import categoryRouter from "./category";
const router = express.Router();

router.use("/users", userRouter);
router.use("/categories", categoryRouter);

export default router;
