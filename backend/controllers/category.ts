import { NextFunction, Request, Response } from "express";
import * as categoryEntity from "../entities/category";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const { category } = req.body;
    const newCategory = await categoryEntity.createCategory({
      category,
      userId,
    });
    res.status(201).json({ status: "success", data: newCategory });
  } catch (err) {
    next(err);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const categories = await categoryEntity.getCategories(userId);
    res.status(200).json({ status: "success", categories });
  } catch (err) {
    next(err);
  }
};

export { createCategory, getCategories };
