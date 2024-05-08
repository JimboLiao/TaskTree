import { NextFunction, Request, Response } from "express";
import * as resourceEntity from "../entities/resource";
import * as taskEntity from "../entities/task";
import { ForbiddenError, NotFoundError } from "../utils/errors/customErrors";

const createResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const taskId = parseInt(req.params.taskId, 10);

    const task = await taskEntity.getTaskById(taskId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // check if task's attendee includes current user
    for (let i = 0; i < task.attendee.length; i++) {
      if (task.attendee[i].userId === userId) {
        break;
      }
      if (i === task.attendee.length - 1) {
        throw new ForbiddenError("Forbidden");
      }
    }

    // create resource
    const { content } = req.body;
    const newResource = await resourceEntity.createResource({
      content,
      taskId,
    });
    res.status(201).json({ status: "success", data: newResource });
  } catch (err) {
    next(err);
  }
};

const getResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.taskId, 10);
    const resources = await resourceEntity.getResourcesByTaskId(taskId);
    res.status(200).json({ status: "success", data: resources });
  } catch (err) {
    next(err);
  }
};

export { createResource, getResources };
