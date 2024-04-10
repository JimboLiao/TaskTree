import express from "express";
import { checkBodyParams } from "../utils/checkParams";
import * as userController from "../controllers/users";
import authJWT from "../middlewares/authJWT";

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

router.post("/googleLogin", userController.googleLogin);
router.get("/googleOAuth", userController.googleCallback);

router.get("/:id", authJWT, userController.getUser);

export default router;
