import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.orderEvent.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Mechanical Keyboard',
        description: 'RGB Mechanical Keyboard',
        price: 499.90,
        stock: 15,
      },
      {
        name: 'Gaming Mouse',
        description: 'Wireless Gaming Mouse',
        price: 249.90,
        stock: 30,
      },
      {
        name: '27" Monitor',
        description: '144Hz IPS Monitor',
        price: 1899.90,
        stock: 8,
      },
      {
        name: 'USB-C Hub',
        description: '7 in 1 USB-C Hub',
        price: 199.90,
        stock: 25,
      },
      {
        name: 'Laptop Stand',
        description: 'Aluminum Laptop Stand',
        price: 149.90,
        stock: 40,
      },
      {
        name: 'Webcam Full HD',
        description: '1080p Webcam',
        price: 329.90,
        stock: 18,
      },
      {
        name: 'Headset',
        description: 'Noise Cancelling Headset',
        price: 699.90,
        stock: 12,
      },
      {
        name: 'Desk Lamp',
        description: 'LED Desk Lamp',
        price: 119.90,
        stock: 50,
      },
      {
        name: 'SSD 1TB',
        description: 'NVMe SSD',
        price: 799.90,
        stock: 20,
      },
      {
        name: 'Notebook',
        description: '15" Notebook',
        price: 5499.90,
        stock: 5,
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable Speaker',
        price: 399.90,
        stock: 22,
      },
      {
        name: 'Office Chair',
        description: 'Ergonomic Office Chair',
        price: 1299.90,
        stock: 10,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });