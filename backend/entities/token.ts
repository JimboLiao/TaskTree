import prisma from "./prismaClient";

const insertToken = async (csrfToken: string): Promise<void> => {
  const token = await prisma.token.create({
    data: {
      token: csrfToken,
      createTime: new Date(),
    },
  });
  return;
};

const isTokenValid = async (token: string) => {
  const t = await prisma.token.findUnique({
    where: { token: token },
  });
  return t !== null;
};

export { insertToken, isTokenValid };
