import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (user) {
      console.log('User found:');
      console.log({
        id: user.id,
        email: user.email,
        role: user.role,
        hasPassword: !!user.password,
        passwordHash: user.password ? `${user.password.substring(0, 10)}...` : 'No password',
      });
    } else {
      console.log('No user found with email: test@example.com');
    }
  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();
