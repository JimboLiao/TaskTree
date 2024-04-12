import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "./errors/customErrors";

/**
 * Generates middleware to check for required parameters in the request body.
 * @param requiredParams - An array of strings representing the required parameters.
 * @returns An Express middleware function.
 */

const checkBodyParams = (requiredParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    for (const param of requiredParams) {
      if (!req.body.hasOwnProperty(param)) {
        next(new BadRequestError(`Missing required parameter: ${param}`));
      }
    }
    next();
  };
};

export { checkBodyParams };
