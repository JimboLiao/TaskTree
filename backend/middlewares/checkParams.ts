import { Request, Response, NextFunction } from "express";

/**
 * Generates middleware to check for required parameters in the request body.
 * @param requiredParams - An array of strings representing the required parameters.
 * @returns An Express middleware function.
 */

const checkBodyParams = (requiredParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    for (const param of requiredParams) {
      if (!req.body.hasOwnProperty(param)) {
        res.status(400).json({ error: `Missing required parameter: ${param}` });
        return;
      }
    }
    next();
  };
};

export { checkBodyParams };
