import prisma from "./prismaClient";

const createCategory = async ({
  category,
  userId,
}: {
  category: {
    name: string;
    gCalendarId?: string;
    color?: string;
  };
  userId: number;
}) => {
  const newCategory = await prisma.category.create({
    data: {
      ...category,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      gCalendarId: true,
      color: true,
    },
  });
  return newCategory;
};

const getCategories = async (userId: number) => {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      gCalendarId: true,
      color: true,
    },
  });
  return categories;
};

const getCategory = async (userId: number, categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
      userId: userId,
    },
  });
  return category;
};

const getUncategorized = async (userId: number) => {
  const category = await prisma.category.findFirst({
    where: {
      name: "Uncategorized",
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      color: true,
    },
  });

  return category;
};

const updateCategory = async ({
  category,
  userId,
}: {
  category: { id: number; name: string; gCalendarId: string; color: string };
  userId: number;
}) => {
  const newCategory = await prisma.category.update({
    where: {
      id: category.id,
      userId: userId,
    },
    data: {
      name: category.name,
      gCalendarId: category.gCalendarId,
      color: category.color,
    },
  });
  return newCategory;
};

export {
  createCategory,
  getCategories,
  getCategory,
  getUncategorized,
  updateCategory,
};
