import express from "express";
import authJWT from "../middlewares/authJWT";
import * as taskController from "../controllers/tasks";
import { checkBodyParams } from "../utils/checkParams";

const router = express.Router();

/**
 * @openapi
 * /api/1.0/tasks:
 *   post:
 *     summary: Create new task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/createTask"
 *     responses:
 *       201:
 *         description: Create new task
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */
router.post(
  "/",
  authJWT,
  checkBodyParams(["categoryId", "task"]),
  taskController.createTask
);

/**
 * @openapi
 * /api/1.0/tasks/{id}/attendee:
 *   post:
 *     summary: Add task attendee
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       $ref: "#/components/requestBodies/addTaskAttendee"
 *     responses:
 *       201:
 *         description: Add task attendee
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 */
router.post(
  "/:id/attendee",
  authJWT,
  checkBodyParams(["email"]),
  taskController.addTaskAttendee
);

/**
 * @openapi
 * /api/1.0/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       $ref: "#/components/requestBodies/updateTaskDetail"
 *     responses:
 *       200:
 *         description: Update task
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 */
router.put(
  "/:id",
  authJWT,
  checkBodyParams(["task", "category", "resources"]),
  taskController.updateTaskDetail
);

/**
 * @openapi
 * /api/1.0/tasks/get:
 *   get:
 *     summary: Get tasks in a time range
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: start
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: end
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Get tasks
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 */
router.get("/get", authJWT, taskController.getTasksInRange);

/**
 * @openapi
 * /api/1.0/tasks/get/{id}:
 *   get:
 *     summary: Get task detail
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Get task detail
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 */
router.get("/get/:id", authJWT, taskController.getTaskDetail);

router.post("/syncToGoogle", authJWT, taskController.syncTasksToGoogleCalendar);
router.post(
  "/importFromGoogle/:categoryId",
  authJWT,
  taskController.importTasksFromGoogle
);

/**
 * @openapi
 * /api/1.0/tasks/{id}/attendee/{attendeeId}/{userId}:
 *   delete:
 *     summary: Delete task attendee
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: attendeeId
 *         description: Attendee ID
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: userId
 *         description: User ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Delete task attendee
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 */
router.delete(
  "/:id/attendee/:attendeeId/:userId",
  authJWT,
  taskController.deletTaskAttendee
);

router.get(
  "/subtasks/:parentTaskId/category/:categoryId",
  taskController.getSubTasks
);

export default router;
