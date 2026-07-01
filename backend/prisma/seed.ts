import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Mouse Gamer',
        description: 'Mouse RGB',
        price: 199.9,
        stock: 15,
      },
      {
        name: 'Teclado Mecânico',
        description: 'Switch Brown',
        price: 399.9,
        stock: 10,
      },
      {
        name: 'Monitor 24"',
        description: 'Full HD',
        price: 899.9,
        stock: 8,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .finally(() => prisma.$disconnect());