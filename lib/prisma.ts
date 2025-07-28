import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Export all Prisma types for use in your application
export * from '@prisma/client';

// Helper function to connect to the database
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('🚀 Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to disconnect from the database
export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    console.log('👋 Database disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
    process.exit(1);
  }
}

// Middleware for handling database operations
export async function withDB<T>(
  operation: () => Promise<T>,
  onError?: (error: unknown) => void
): Promise<T | null> {
  try {
    await connectDB();
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    if (onError) {
      onError(error);
    }
    return null;
  } finally {
    await disconnectDB();
  }
}

// Example usage:
// const users = await withDB(() => prisma.user.findMany());
