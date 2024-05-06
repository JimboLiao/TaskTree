import { NextFunction, Request, Response } from "express";
import * as taskEntity from "../entities/task";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.id;
    const { task, categoryId, resources } = req.body;
    const newTask = await taskEntity.createTask({
      task,
      userId,
      categoryId,
      resources,
    });

    res.status(201).json({ status: "success", data: newTask });
  } catch (err) {
    next(err);
  }
};

const getTasksInRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { start, end } = req.query as { start: string; end: string };
    if (!start || !end) {
      throw new Error("Missing required query parameters: start and end");
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    const userId = res.locals.id;
    const tasks = await taskEntity.getTasksInRange({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      userId,
    });
    res.status(200).json({ status: "success", data: tasks });
  } catch (err) {
    next(err);
  }
};

export { createTask, getTasksInRange };
