import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  ForbiddenError,
  UnauthorizedError,
} from "../utils/errors/customErrors";

interface tokenPayload extends JwtPayload {
  id?: number;
}
const authJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("authorization");
    const token = authHeader && authHeader.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedError("No JWT");
    }

    // verify token
    const key = process.env.TOKEN_SECRET || "";
    const decoded = jwt.verify(token, key) as tokenPayload;
    if (!decoded.id || decoded.id.toString() !== req.params.id) {
      throw new ForbiddenError("Invalid or expired token");
    }
    res.locals.id = decoded.id;
    next();
  } catch (err) {
    next(err);
  }
};

export default authJWT;
