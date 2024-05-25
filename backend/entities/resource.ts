import prisma from "./prismaClient";

const createResource = async ({
  content,
  taskId,
}: {
  content: string;
  taskId: number;
}) => {
  const newResource = await prisma.resource.create({
    data: {
      content: content,
      taskId: taskId,
    },
  });
  return newResource;
};

const createManyResources = async ({
  res,
  taskId,
}: {
  res: { content: string }[];
  taskId: number;
}) => {
  const newResources = await prisma.resource.createMany({
    data: res.map((r) => ({
      content: r.content,
      taskId: taskId,
    })),
  });
  return newResources;
};

const getResourcesByTaskId = async (taskId: number) => {
  const resources = await prisma.resource.findMany({
    where: {
      taskId: taskId,
    },
  });
  return resources;
};

const updateResource = async (resourceId: number, content: string) => {
  return await prisma.resource.update({
    where: {
      id: resourceId,
    },
    data: {
      content: content,
    },
  });
};

const deleteResource = async (resourceId: number) => {
  return await prisma.resource.delete({
    where: {
      id: resourceId,
    },
  });
};

const deleteManyResources = async (resourceIds: number[]) => {
  return await prisma.resource.deleteMany({
    where: {
      id: {
        in: resourceIds,
      },
    },
  });
};

export {
  createResource,
  createManyResources,
  getResourcesByTaskId,
  updateResource,
  deleteResource,
  deleteManyResources,
};
