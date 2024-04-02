import bcrypt from "bcrypt";
import prisma from "./prismaClient";

const SALTROUND = 10;

interface User {
  id: number;
  email: string;
  password: string;
  username: string | null;
  createTime: Date;
  updateTime: Date;
}

const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  const hashpassword = await bcrypt.hash(password, SALTROUND);
  const date = new Date();
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashpassword,
      createTime: date,
      updateTime: date,
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

  if (!user) throw new Error("user not found");

  const match = await bcrypt.compare(password, user.password);
  if (match) return user;

  throw new Error("password mismatch");
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

  if (!user) throw new Error("user not found");
  return user;
};

export { createUser, loginUser, getUserById };
