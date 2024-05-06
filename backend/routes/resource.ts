import express from "express";
import authJWT from "../middlewares/authJWT";
import * as resourceController from "../controllers/resource";

const router = express.Router();
router.post("/:taskId", authJWT, resourceController.createResource);
router.get("/:taskId", authJWT, resourceController.getResources);

export default router;
