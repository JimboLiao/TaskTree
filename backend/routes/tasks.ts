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
router.put(
  "/:id/attendee",
  authJWT,
  checkBodyParams(["email"]),
  taskController.addTaskAttendee
);
router.put(
  "/:id",
  authJWT,
  checkBodyParams(["task", "category", "resources", "attendees"]),
  taskController.updateTaskDetail
);
router.get("/get", authJWT, taskController.getTasksInRange);
router.get("/get/:id", authJWT, taskController.getTaskDetail);
router.get("/getAll", authJWT, taskController.getAllTasks);
router.post("/syncToGoogle", authJWT, taskController.syncTasksToGoogleCalendar);
router.post(
  "/importFromGoogle/:categoryId",
  authJWT,
  taskController.importTasksFromGoogle
);
router.delete(
  "/:id/attendee/:attendeeId/:userId",
  authJWT,
  taskController.deletTaskAttendee
);

export default router;
