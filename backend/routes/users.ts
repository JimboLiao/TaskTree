import express from "express";
import { checkBodyParams } from "../middlewares/checkParams";
import * as userController from "../controllers/users";

const router = express.Router();

router.post(
  "/signup",
  checkBodyParams(["email", "password"]),
  userController.signup
);

router.post(
  "/login",
  checkBodyParams(["email", "password"]),
  userController.login
);

export default router;
