import express from "express";
import authJWT from "../middlewares/authJWT";
import * as taskController from "../controllers/tasks";
import { checkBodyParams } from "../utils/checkParams";

const router = express.Router();

router.post(
  "/",
  authJWT,
  checkBodyParams(["categoryId", "task", "resources"]),
  taskController.createTask
);
router.get("/get", authJWT, taskController.getTasksInRange);
export default router;
