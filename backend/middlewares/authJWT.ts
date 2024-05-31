import { NextFunction, Request, Response } from "express";
import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors/customErrors";

interface tokenPayload extends JwtPayload {
  id?: number;
}
const authJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || req.cookies.token;
    if (!token) {
      throw new UnauthorizedError("No JWT");
    }

    // verify token
    const key = process.env.TOKEN_SECRET || "";
    const decoded = jwt.verify(token, key) as tokenPayload;
    res.locals.id = decoded.id;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      next(new UnauthorizedError("JWT has expired"));
    } else if (err instanceof JsonWebTokenError) {
      next(new UnauthorizedError("Invalid JWT"));
    } else if (err instanceof NotBeforeError) {
      next(new UnauthorizedError("JWT not active"));
    } else {
      next(err);
    }
  }
};

export default authJWT;
