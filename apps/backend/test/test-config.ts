import { PrismaClient } from "@prisma/client";

// Test database configuration
export const testConfig = {
  database: {
    url:
      process.env.TEST_DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/test_db",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "test-secret-key",
    expiresIn: "1h",
  },
};

// Test Prisma client
export const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: testConfig.database.url,
    },
  },
});

// Test user data
export const testUser = {
  email: "test@example.com",
  password: "testpassword123",
  name: "Test User",
  role: "USER",
};

// Test admin data
export const testAdmin = {
  email: "admin@example.com",
  password: "adminpassword123",
  name: "Admin User",
  role: "ADMIN",
};

// Test JWT payload
export const testJwtPayload = (userId: string, role: string) => ({
  sub: userId,
  email: `${role.toLowerCase()}@example.com`,
  role,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
});
