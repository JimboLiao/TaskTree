import express from "express";
import authJWT from "../middlewares/authJWT";
import * as categoryController from "../controllers/category";
import { checkBodyParams } from "../utils/checkParams";

const router = express.Router();

/**
 * @openapi
 * /api/1.0/categories:
 *   post:
 *     summary: Create new category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/createCategory"
 *     responses:
 *       201:
 *         description: Create new category
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */
router.post(
  "/",
  authJWT,
  checkBodyParams(["category"]),
  categoryController.createCategory
);

/**
 * @openapi
 * /api/1.0/categories:
 *   get:
 *     summary: Get categories of user
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get categories
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */
router.get("/", authJWT, categoryController.getCategories);

export default router;
