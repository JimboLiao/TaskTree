import { NextFunction, Request, Response } from "express";
import * as userEntity from "../entities/users";
import signJWT from "../utils/signJWT";
import { OAuth2Client } from "google-auth-library";

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, PORT } = process.env;

const googleOAuthClient = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: `http://localhost:${PORT}/api/1.0/users/googleOAuth`,
});

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
    res.status(200).json({ status: "success", user });
  } catch (err) {
    next(err);
  }
};

const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizeUrl = googleOAuthClient.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
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
      user = await userEntity.createUser({ email });
    }

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

export { signup, login, getUser, googleLogin, googleCallback };
