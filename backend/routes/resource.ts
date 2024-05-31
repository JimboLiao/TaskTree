import express from "express";
import authJWT from "../middlewares/authJWT";
import * as resourceController from "../controllers/resource";

const router = express.Router();
/**
 * @openapi
 * /api/1.0/resources/{taskId}:
 *   post:
 *     summary: Create new resource
 *     tags:
 *       - Resource
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       $ref: "#/components/requestBodies/createResource"
 *     responses:
 *       201:
 *         description: Create new resource
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 */
router.post("/:taskId", authJWT, resourceController.createResource);

/**
 * @openapi
 * /api/1.0/resources/{taskId}:
 *   get:
 *     summary: Get resources of task
 *     tags:
 *       - Resource
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Get resources of task
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 */
router.get("/:taskId", authJWT, resourceController.getResources);

export default router;
