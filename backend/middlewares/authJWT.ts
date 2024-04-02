import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface tokenPayload extends JwtPayload {
  id?: number;
}
const authJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("authorization");
  const token = authHeader && authHeader.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "error", err: "No JWT" });
    return;
  }

  try {
    // verify token
    const key = process.env.TOKEN_SECRET || "";
    const decoded = jwt.verify(token, key) as tokenPayload;
    if (!decoded.id) {
      return res
        .status(403)
        .json({ message: "error", err: "JWT payload does not contain id" });
    }
    res.locals.id = decoded.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "error", err: "Invalid or expired JWT" });
  }
};

export default authJWT;
