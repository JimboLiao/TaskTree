import { NextFunction, Request, Response } from "express";
import * as userEntity from "../entities/users";
import * as tokenEntity from "../entities/token";
import signJWT from "../utils/signJWT";
import crypto from "crypto";
import { UnauthorizedError } from "../utils/errors/customErrors";
import { googleOAuthClient } from "../google/googleAPI";

interface UserInfoData {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

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
    const jwt = signJWT(user.id);

    res.cookie("token", jwt, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3 * 1000,
      // secure: true,  // https
    });
    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createTime: user.createTime,
        updateTime: user.updateTime,
      },
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userEntity.getUserById(res.locals.id);
    res.status(200).json({ status: "success", user });
  } catch (err) {
    next(err);
  }
};

const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // random string as CSRF token
    const state = crypto.randomBytes(32).toString("hex");
    tokenEntity.insertToken(state);

    const authorizeUrl = googleOAuthClient.generateAuthUrl({
      access_type: "offline",
      state: state,
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/calendar",
      ],
    });

    res.status(200).json({ url: authorizeUrl });
  } catch (err) {
    next(err);
  }
};

const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const state = req.query.state as string;
    if (!state || !tokenEntity.isTokenValid(state)) {
      res.redirect("http://localhost:5173/googleLogin");
      throw new UnauthorizedError("Invalid state");
    }
    const code = req.query.code as string;

    const { tokens } = await googleOAuthClient.getToken(code);
    googleOAuthClient.setCredentials(tokens);

    // get user info by API
    const userInfo = await googleOAuthClient.request<UserInfoData>({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    // if user doesn't exist, create one
    const email = userInfo.data.email;
    let user = await userEntity.getUserByEmail(email);
    if (!user) {
      const refreshToken = tokens.refresh_token || undefined;
      user = await userEntity.createUser({ email });
    }

    // update refresh token if there is one
    if (tokens.refresh_token) {
      await userEntity.updateRefreshToken(user.id, tokens.refresh_token);
    }

    const jwt = signJWT(user.id);

    res.cookie("token", jwt, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3 * 1000,
      // secure: true,  // https
    });
    res.redirect("http://localhost:5173/googleLogin");
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // clear token by setting the expire time in the past
    res.cookie("token", "", {
      expires: new Date(0), // 1970-01-01T00:00:00Z
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      // secure: true,
    });
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export { signup, login, getUser, googleLogin, googleCallback, logout };
