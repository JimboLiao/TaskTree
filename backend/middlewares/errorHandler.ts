import { NextFunction, Request, Response } from "express";

// Error handling middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "Something went wrong in the application";

  res.status(statusCode).json({
    status: "fail",
    error: {
      message,
      type: err.name,
      statusCode,
    },
  });
};

export default errorHandler;
