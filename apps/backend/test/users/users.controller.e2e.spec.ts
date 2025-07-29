import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common/pipes';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaClient, UserRole } from '@prisma/client';

// Helper function to get auth header
function getAuthHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

// Increase the default test timeout to 30 seconds
jest.setTimeout(30000);

// Interface for test user
type TestUser = {
  id: string;
  email: string;
  role: UserRole;
  name: string;
};

describe('UsersController (e2e)', () => {
  let app: NestExpressApplication;
  
  // Test tokens - these should match the format expected by JwtAuthGuard
  const adminTestToken = 'admin-test-token';
  const userTestToken = 'user-test-token';
  
  // Test users - these should match the users in JwtAuthGuard
  const adminUser: TestUser = {
    id: 'test-admin-id',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    name: 'Admin User'
  };
  
  const regularUser: TestUser = {
    id: 'test-user-id',
    email: 'user@example.com',
    role: UserRole.USER,
    name: 'Regular User'
  };

  beforeAll(async () => {
    console.log('Setting up test environment...');

    try {
      // Initialize the Prisma client
      global.prisma = new PrismaClient();
      await global.prisma.$connect();
      
      // Run migrations to ensure the database is in the correct state
      console.log('Running database migrations...');
      
      // Create UserRole enum type if it doesn't exist
      await global.prisma.$executeRaw`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserRole') THEN
            CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
          END IF;
        END $$;
      `;
      
      // Create users table if it doesn't exist
      await global.prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "name" TEXT,
          "email" TEXT,
          "email_verified" TIMESTAMP(3),
          "image" TEXT,
          "password" TEXT,
          "role" "UserRole" NOT NULL DEFAULT 'USER',
          "reset_token" TEXT,
          "reset_token_expiry" TIMESTAMP(3),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL
        );
      `;
      
      // Create unique index on email if it doesn't exist
      await global.prisma.$executeRaw`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_indexes 
            WHERE tablename = 'users' 
            AND indexname = 'users_email_key'
          ) THEN
            CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
          END IF;
        END $$;
      `;

      // Create test users
      console.log('Creating test users...');
      await global.prisma.$executeRaw`
        INSERT INTO "users" ("id", "name", "email", "role", "created_at", "updated_at")
        VALUES 
          ('test-admin-id', 'Admin User', 'admin@example.com', 'ADMIN'::"UserRole", NOW(), NOW()),
          ('test-user-id', 'Regular User', 'user@example.com', 'USER'::"UserRole", NOW(), NOW())
        ON CONFLICT ("id") DO UPDATE SET
          "name" = EXCLUDED."name",
          "email" = EXCLUDED."email",
          "role" = EXCLUDED."role",
          "updated_at" = NOW();
      `;
      
      console.log('Creating test module...');
      const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      console.log('Creating NestJS application...');
      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
      
      console.log('Initializing application...');
      await app.init();
      
      console.log('Test environment setup complete');
    } catch (error) {
      console.error('Error during test setup:', error);
      throw error;
    }
  });

  afterAll(async () => {
    console.log('Starting test teardown...');
    
    // Close the NestJS application first
    if (app) {
      try {
        await app.close();
        console.log('NestJS application closed');
      } catch (error) {
        console.error('Error closing NestJS application:', error);
      }
    }
    
    // Then clean up the database
    if (global.prisma) {
      try {
        console.log('Cleaning up test database...');
        
        // Drop tables if they exist (in reverse order of creation)
        await global.prisma.$executeRaw`DROP TABLE IF EXISTS "sessions" CASCADE`;
        await global.prisma.$executeRaw`DROP TABLE IF EXISTS "accounts" CASCADE`;
        await global.prisma.$executeRaw`DROP TABLE IF EXISTS "users" CASCADE`;
        
        // Drop the enum type if it exists
        await global.prisma.$executeRaw`
          DO $$
          BEGIN
            IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserRole') THEN
              DROP TYPE "UserRole" CASCADE;
            END IF;
          END $$;
        `;
        
        console.log('Test database cleaned up');
      } catch (error) {
        console.error('Error cleaning up test database:', error);
      }
      
      try {
        await global.prisma.$disconnect();
        console.log('Prisma client disconnected');
      } catch (error) {
        console.error('Error disconnecting Prisma client:', error);
      }
    }
    
    console.log('Test teardown complete');
  });

  describe('GET /users', () => {
    it('should return 403 Forbidden for non-admin users', async () => {
      const authHeader = getAuthHeader(userTestToken);
      
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', authHeader.Authorization)
        .expect(403);
    });

    it('should return paginated users for admin', async () => {
      const authHeader = getAuthHeader(adminTestToken);
      
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', authHeader.Authorization)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.meta).toHaveProperty('total');
      expect(response.body.meta).toHaveProperty('page');
      expect(response.body.meta).toHaveProperty('pageSize');
      
      // Check that sensitive data is not exposed
      if (response.body.data.length > 0) {
        const user = response.body.data[0];
        expect(user).not.toHaveProperty('password');
        expect(user).not.toHaveProperty('resetToken');
        expect(user).not.toHaveProperty('resetTokenExpiry');
      }
    });
  });

  describe('GET /users/me', () => {
    it('should return current user profile', async () => {
      const authHeader = getAuthHeader(userTestToken);
      
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', authHeader.Authorization)
        .expect(200);

      expect(response.body).toHaveProperty('id', regularUser.id);
      expect(response.body).toHaveProperty('email', regularUser.email);
      expect(response.body).toHaveProperty('name');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 403 Forbidden without token', async () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .expect(403);
    });
  });

  describe('GET /users/:id', () => {
    it('should return user by ID for admin', async () => {
      const authHeader = getAuthHeader(adminTestToken);
      
      const response = await request(app.getHttpServer())
        .get(`/users/${regularUser.id}`)
        .set('Authorization', authHeader.Authorization)
        .expect(200);

      expect(response.body).toHaveProperty('id', regularUser.id);
      expect(response.body).toHaveProperty('email', regularUser.email);
      expect(response.body).toHaveProperty('name');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 403 Forbidden for non-admin accessing other user', async () => {
      const authHeader = getAuthHeader(userTestToken);
      
      return request(app.getHttpServer())
        .get(`/users/${adminUser.id}`)
        .set('Authorization', authHeader.Authorization)
        .expect(403);
    });
  });
});
