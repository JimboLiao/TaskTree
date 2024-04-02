import { Request, Response } from "express";
import * as userEntity from "../entities/users";
import signJWT from "../utils/signJWT";

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // add new user into database
    const user = await userEntity.createUser({ email, password });
    res.status(201).json({ message: "success", id: user.id });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: "error", err: err.message });
      return;
    }
    res.status(500).json({ message: "error", err: "signup failed" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userEntity.loginUser({ email, password });
    const token = signJWT(user.id);

    res.status(200).json({
      message: "success",
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        createTime: user.createTime,
        updateTime: user.updateTime,
        token: token,
      },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: "error", err: err.message });
      return;
    }
    res.status(500).json({ message: "error", err: "login failed" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userEntity.getUserById(res.locals.id);
    res.status(200).json({ message: "success", data: { user } });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: "error", err: err.message });
      return;
    }
    res.status(500).json({ message: "error", err: "get user failed" });
  }
};

export { signup, login, getUser };
