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
  });
  return categories;
};

const getCategory = async (userId: number, categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
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

export { createCategory, getCategories, getCategory, updateCategory };
