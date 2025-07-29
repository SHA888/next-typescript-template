import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

// Test database configuration
const TEST_DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/test_db?schema=public';

/**
 * Sets up a clean test database with all migrations applied
 */
export const setupTestDatabase = async () => {
  let prisma: PrismaClient | null = null;

  try {
    // Create a new Prisma client with direct connection to the test database
    prisma = new PrismaClient({
      datasources: {
        db: { url: TEST_DATABASE_URL },
      },
      log: ['error', 'warn'],
    });

    // Connect to the test database
    await prisma.$connect();

    // Drop and recreate the database schema to ensure a clean state
    console.log('Resetting test database...');
    await prisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`;
    await prisma.$executeRaw`CREATE SCHEMA public`;

    // Verify the schema is empty
    const tablesBefore = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;
    console.log('Tables before migrations:', tablesBefore);

    // Run migrations on the test database
    console.log('Running migrations...');
    execSync('npx prisma migrate deploy', {
      env: {
        ...process.env,
        NODE_ENV: 'test',
        DATABASE_URL: TEST_DATABASE_URL,
      },
      stdio: 'inherit',
    });

    // Verify migrations were applied
    const migrations = await prisma.$queryRaw`
      SELECT * FROM _prisma_migrations;
    `;
    console.log('Applied migrations:', migrations);

    // Verify the schema was created correctly
    const tablesAfter = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;
    console.log('Tables after migrations:', tablesAfter);

    // Verify the users table exists and has the expected structure
    const usersTable = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND table_schema = 'public';
    `;
    console.log('Users table structure:', usersTable);

    console.log('Test database setup complete');
    return prisma;
  } catch (error) {
    console.error('Failed to set up test database:', error);
    if (prisma) {
      await prisma.$disconnect().catch(console.error);
    }
    throw error;
  }
};

/**
 * Cleans up the test database after tests have run
 */
export const teardownTestDatabase = async (prisma?: PrismaClient) => {
  if (!prisma) return;

  try {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error during test database teardown:', error);
    throw error;
  }
};

/**
 * Creates a new Prisma client connected to the test database
 */
export const createTestPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: { url: TEST_DATABASE_URL },
    },
    log: ['error', 'warn'],
  });
};
