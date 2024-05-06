import prisma from "./prismaClient";

const createCategory = async ({
  category,
  userId,
}: {
  category: {
    name: string;
    gCalendarId?: string;
  };
  userId: number;
}) => {
  const newCategory = await prisma.category.create({
    data: {
      ...category,
      users: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      users: { select: { id: true } },
    },
  });
  return newCategory;
};

const getCategories = async (userId: number) => {
  const categories = await prisma.category.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
  return categories;
};

const updateCategory = async ({
  category,
  userId,
}: {
  category: { id: number; name: string; gCalendarId: string };
  userId: number;
}) => {
  const newCategory = await prisma.category.update({
    where: {
      id: category.id,
      users: {
        some: {
          id: userId,
        },
      },
    },
    data: {
      name: category.name,
      gCalendarId: category.gCalendarId,
    },
  });
  return newCategory;
};

export { createCategory, getCategories, updateCategory };
