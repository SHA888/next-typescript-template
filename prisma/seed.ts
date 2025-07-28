import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

// Number of test users to create
const NUM_TEST_USERS = 5;

// Helper function to generate a random date within a range
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log('🌱 Starting database seeding...');
  const startTime = Date.now();

  try {
    // Clear existing data if not in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('🧹 Clearing existing data...');

      // Disable foreign key checks temporarily
      await prisma.$executeRaw`SET session_replication_role = 'replica'`;

      // Get all tables and truncate them
      const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        AND tablename != '_prisma_migrations'
      `;

      for (const { tablename } of tables) {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE;`);
      }

      // Re-enable foreign key checks
      await prisma.$executeRaw`SET session_replication_role = 'origin'`;
    }

    // Create test users
    const users = [];
    for (let i = 0; i < NUM_TEST_USERS; i++) {
      const email = i === 0 ? 'test@example.com' : faker.internet.email();

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name: faker.person.fullName(),
          emailVerified: faker.datatype.boolean() ? new Date() : null,
          image: faker.image.avatar(),
          password: faker.internet.password(),
        },
      });

      // Create associated account
      await prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: faker.helpers.arrayElement(['google', 'github', 'facebook']),
          providerAccountId: faker.string.uuid(),
          refreshToken: faker.string.alphanumeric(40),
          accessToken: faker.string.alphanumeric(40),
          expiresAt: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
          tokenType: 'Bearer',
          scope: 'read:user,user:email',
          idToken: faker.string.alphanumeric(40),
          sessionState: faker.string.alphanumeric(20),
        },
      });

      // Create session
      await prisma.session.create({
        data: {
          userId: user.id,
          sessionToken: faker.string.uuid(),
          expires: randomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30 days from now
        },
      });

      // Create verification token for some users
      if (Math.random() > 0.5) {
        await prisma.verificationToken.create({
          data: {
            identifier: user.email!,
            token: faker.string.alphanumeric(32),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
          },
        });
      }

      users.push(user);
      console.log(`✅ Created user: ${user.email}`);
    }

    // Get counts for summary
    const [userCount, accountCount, sessionCount, verificationTokenCount] = await Promise.all([
      prisma.user.count(),
      prisma.account.count(),
      prisma.session.count(),
      prisma.verificationToken.count(),
    ]);

    // Print summary
    console.log('\n📊 Database seeding completed successfully!');
    console.log('===================================');
    console.log(`👥 Users: ${userCount}`);
    console.log(`🔑 Accounts: ${accountCount}`);
    console.log(`🔐 Sessions: ${sessionCount}`);
    console.log(`✉️  Verification Tokens: ${verificationTokenCount}`);
    console.log(`⏱️  Time taken: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
    console.log('===================================');

    return { users };
  } catch (error) {
    console.error('❌ Error during database seeding:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the main function
main()
  .then(() => {
    console.log('✨ Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error during seeding:');
    console.error(error);
    process.exit(1);
  });
