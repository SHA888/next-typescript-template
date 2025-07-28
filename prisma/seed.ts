// Using ES modules
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Starting database seeding...');

  try {
    // Test the connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Create a test user
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    console.log('✅ Created/Updated test user:', user);

    // List all users
    const allUsers = await prisma.user.findMany();
    console.log('📋 All users in database:', allUsers);

    console.log('✅ Database has been seeded successfully!');
    return user;
  } catch (error) {
    console.error('❌ Error during database operation:', error);
    throw error;
  }
}

// Execute the main function
main()
  .catch((e) => {
    console.error('❌ Fatal error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Disconnected from database');
  });
