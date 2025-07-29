import { prisma } from '../lib/prisma';

async function verifyDatabase() {
  console.log('🔍 Verifying database contents...');

  try {
    // Verify users
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
      },
      take: 5,
    });

    console.log('\n👥 Users:');
    console.table(
      users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        accounts: user.accounts.length,
        sessions: user.sessions.length,
        createdAt: user.createdAt.toISOString(),
      }))
    );

    // Verify accounts
    const accounts = await prisma.account.findMany({
      include: {
        user: {
          select: { email: true },
        },
      },
      take: 5,
    });

    console.log('\n🔑 Accounts:');
    console.table(
      accounts.map((account) => ({
        id: account.id,
        provider: account.provider,
        userEmail: account.user.email,
        type: account.type,
      }))
    );

    // Verify verification tokens
    const verificationTokens = await prisma.verificationToken.findMany({
      take: 5,
    });

    console.log('\n✉️ Verification Tokens:');
    console.table(
      verificationTokens.map((token) => ({
        identifier: token.identifier,
        expires: token.expires.toISOString(),
      }))
    );

    console.log('\n✅ Database verification completed successfully!');
  } catch (error) {
    console.error('❌ Error verifying database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
