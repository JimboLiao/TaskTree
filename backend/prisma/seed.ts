import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// dummy data
const dummyUser = {
  email: "test@gmail.com",
  password: "123",
};

async function main() {
  console.log("Prisma seeding...");

  // delete all data
  await prisma.taskOfUser.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.token.deleteMany();
  await prisma.task.deleteMany();

  const hashpassword = await bcrypt.hash(dummyUser.password, 10);
  const date = new Date();
  const user = await prisma.user.create({
    data: {
      email: dummyUser.email,
      password: hashpassword,
      createTime: date,
      updateTime: date,
    },
  });

  await prisma.category.createMany({
    data: [
      {
        name: "Work",
        gCalendarId: null,
        color: "#1983FF",
        userId: user.id,
      },
      {
        name: "Travel",
        gCalendarId: null,
        color: undefined,
        userId: user.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
