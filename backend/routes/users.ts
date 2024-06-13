import express from "express";
import { checkBodyParams } from "../utils/checkParams";
import * as userController from "../controllers/users";
import authJWT from "../middlewares/authJWT";

const router = express.Router();

/**
 * @openapi
 * /api/1.0/users/signup:
 *   post:
 *     summary: Create new user
 *     tags:
 *       - User
 *     requestBody:
 *       $ref: "#/components/requestBodies/signup"
 *     responses:
 *       201:
 *         description: Create new user
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 */
router.post(
  "/signup",
  checkBodyParams(["email", "password"]),
  userController.signup
);

/**
 * @openapi
 * /api/1.0/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     requestBody:
 *       $ref: "#/components/requestBodies/login"
 *     responses:
 *       200:
 *         description: Login user
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 */
router.post(
  "/login",
  checkBodyParams(["email", "password"]),
  userController.login
);

/**
 * @openapi
 * /api/1.0/users/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout user
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */
router.post("/logout", authJWT, userController.logout);

router.post("/googleLogin", userController.googleLogin);
router.get("/googleOAuth", userController.googleCallback);

/**
 * @openapi
 * /api/1.0/users:
 *   get:
 *     summary: Get user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get user profile
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *
 */
router.get("/", authJWT, userController.getUser);

export default router;
