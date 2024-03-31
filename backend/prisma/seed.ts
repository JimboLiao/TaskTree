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
  await prisma.user.deleteMany();

  const hashpassword = await bcrypt.hash(dummyUser.password, 10);
  const date = new Date();
  await prisma.user.create({
    data: {
      email: dummyUser.email,
      password: hashpassword,
      createTime: date,
      updateTime: date,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
