import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedExample() {
  const result = await prisma.example.create({
    data: {
      name: "Example",
    },
  });

  console.log(`${result.id} - ${result.name}`);
}

async function main() {
  await seedExample();

  console.log("Seed completed");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
