import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TEST_CONFIG } from './test-config';

// Extend the global namespace to include our test variables
declare global {
  // eslint-disable-next-line no-var
  var app: NestExpressApplication;
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

// Initialize the test environment before all tests
beforeAll(async () => {
  try {
    console.log('Setting up test environment...');

    // Environment variables are already set by test-config.ts import
    console.log('Test environment variables set:');
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`JWT_SECRET: ***${TEST_CONFIG.JWT.SECRET.slice(-4)}`);
    console.log(`JWT_EXPIRES_IN: ${TEST_CONFIG.JWT.EXPIRES_IN}`);
    console.log('--------------------------------------\n');

    // Create testing module
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => ({
              JWT_SECRET: TEST_CONFIG.JWT.SECRET,
              JWT_EXPIRES_IN: TEST_CONFIG.JWT.EXPIRES_IN,
            }),
          ],
        }),
        JwtModule.register({
          secret: TEST_CONFIG.JWT.SECRET,
          signOptions: { expiresIn: TEST_CONFIG.JWT.EXPIRES_IN },
        }),
        AppModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue({
        user: {
          findUnique: jest.fn().mockImplementation(({ where }) => {
            if (where.email === 'user@example.com' || where.id === 'test-user-id') {
              return Promise.resolve({
                id: 'test-user-id',
                email: 'user@example.com',
                name: 'Test User',
                role: 'USER',
                password: '$2b$10$examplehash', // Mock hashed password
              });
            }
            return Promise.resolve(null);
          }),
        },
      })
      .compile();

    // Create Nest application with Express platform
    globalThis.app = moduleFixture.createNestApplication<NestExpressApplication>();

    // Apply global pipes
    globalThis.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      })
    );

    // Initialize application
    await globalThis.app.init();

    // Initialize Prisma client
    globalThis.prisma = new PrismaClient();
    await globalThis.prisma.$connect();

    console.log('Test environment setup complete\n');
  } catch (error) {
    console.error('Failed to set up test environment:', error);
    throw error;
  }
});

// Clean up after all tests
afterAll(async () => {
  if (globalThis.prisma) {
    await globalThis.prisma.$disconnect();
  }
  
  if (globalThis.app) {
    await globalThis.app.close();
    console.log('Test environment cleaned up\n');
  }
});

// Clean up database after each test
afterEach(async () => {
  if (globalThis.prisma) {
    try {
      // Disable foreign key checks to avoid issues with truncating tables with foreign key constraints
      await globalThis.prisma.$executeRaw`SET session_replication_role = 'replica'`;

      // Get all tables in the database
      const tables = await globalThis.prisma.$queryRaw`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
      `;

      // Truncate all tables
      for (const table of tables as any[]) {
        await globalThis.prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table.tablename}" CASCADE`);
      }

      // Re-enable foreign key checks
      await globalThis.prisma.$executeRaw`SET session_replication_role = 'origin'`;
    } catch (error) {
      console.error('Error cleaning up database:', error);
      throw error;
    }
  }
});
