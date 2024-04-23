import bcrypt from "bcrypt";
import prisma from "./prismaClient";
import { NotFoundError, ValidationError } from "../utils/errors/customErrors";

const SALTROUND = 10;

interface User {
  id: number;
  email: string;
  password: string | null;
  username: string | null;
  createTime: Date;
  updateTime: Date;
  refreshToken: string | null;
}

const createUser = async ({
  email,
  password,
  refreshToken,
}: {
  email: string;
  password?: string;
  refreshToken?: string;
}): Promise<User> => {
  let hashpassword = null;
  if (password) hashpassword = await bcrypt.hash(password, SALTROUND);
  const date = new Date();
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashpassword,
      createTime: date,
      updateTime: date,
      refreshToken: refreshToken,
    },
  });
  return user;
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new NotFoundError("User not found");
  if (!user.password)
    throw new NotFoundError("No password, try 3rd party login.");

  const match = await bcrypt.compare(password, user.password);
  if (match) return user;

  throw new ValidationError("Password mismatch");
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      password: false,
      id: true,
      email: true,
      username: true,
      createTime: true,
      updateTime: true,
    },
  });

  if (!user) throw new NotFoundError("User not found");
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      password: false,
      id: true,
      email: true,
      username: true,
      createTime: true,
      updateTime: true,
    },
  });
  return user;
};

const getRefreshTokenByUserId = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      refreshToken: true,
    },
  });

  return user?.refreshToken;
};

const updateRefreshToken = async (id: number, refreshToken: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      refreshToken: refreshToken,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createTime: true,
      updateTime: true,
    },
  });

  return user;
};

export {
  createUser,
  loginUser,
  getUserById,
  getUserByEmail,
  getRefreshTokenByUserId,
  updateRefreshToken,
};
