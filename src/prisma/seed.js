const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const init = await prisma.team.upsert({
    where: { name: "test" },
    update: {},
    create: {
      name: 'test'
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: `admin@admin.com`,
      name: "admin",
      role: "ADMIN",
      password: "$2b$10$BFmibvOW7FtY0soAAwujoO9y2tIyB7WEJ2HNq9O7zh9aeejMvRsKu",
      teamId: init.id,
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
