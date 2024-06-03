import express from "express";
import authJWT from "../middlewares/authJWT";
import * as categoryController from "../controllers/category";
import { checkBodyParams } from "../utils/checkParams";

const router = express.Router();

router.post(
  "/",
  authJWT,
  checkBodyParams(["category"]),
  categoryController.createCategory
);
router.get("/", authJWT, categoryController.getCategories);

export default router;
