import { PrismaClient } from '@prisma/client';

// Simple Prisma client with minimal configuration
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('Testing database connection...');

  try {
    // Test the connection with a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Database connection successful!', result);

    // List all tables in the database
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Database tables:', tables);
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
