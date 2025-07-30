/* eslint-env node */
/* eslint-disable no-console */

// Simple test script to verify Prisma client functionality
import { PrismaClient } from '@app/database';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

// Initialize Prisma Client with minimal configuration
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: ['query', 'info', 'warn', 'error'],
});

async function testPrisma() {
  try {
    console.log('🔌 Testing Prisma Client...');

    // Test connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Test query
    const users = await prisma.user.findMany();
    console.log('📋 Users in database:', users);

    // Test creating a user
    const newUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    console.log('✅ Created/Updated user:', newUser);

    // Verify user was created
    const allUsers = await prisma.user.findMany();
    console.log('📋 All users after operation:', allUsers);

    return { success: true };
  } catch (error) {
    console.error('❌ Error testing Prisma Client:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Disconnected from database');
  }
}

// Run the test
testPrisma()
  .then(() => console.log('✅ All tests completed successfully!'))
  .catch((e) => {
    console.error('❌ Test failed:', e);
    process.exit(1);
  });
