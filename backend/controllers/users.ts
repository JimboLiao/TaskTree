import { NextFunction, Request, Response } from "express";
import * as userEntity from "../entities/users";
import signJWT from "../utils/signJWT";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // add new user into database
    const user = await userEntity.createUser({ email, password });
    res.status(201).json({ status: "success", id: user.id });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await userEntity.loginUser({ email, password });
    const token = signJWT(user.id);

    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createTime: user.createTime,
        updateTime: user.updateTime,
      },
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userEntity.getUserById(res.locals.id);
    res.status(200).json({ message: "success", data: { user } });
  } catch (err) {
    next(err);
  }
};

export { signup, login, getUser };
