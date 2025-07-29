import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function cleanupAndRegister() {
  const testEmail = 'test@example.com';
  const testPassword = 'password123';
  const testName = 'Test User';

  try {
    // Delete existing test user if it exists
    console.log('Checking for existing test user...');
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (existingUser) {
      console.log('Deleting existing test user...');
      await prisma.user.delete({
        where: { id: existingUser.id },
      });
      console.log('Test user deleted successfully');
    } else {
      console.log('No existing test user found');
    }

    // Create a new test user with properly hashed password
    console.log('\nCreating new test user...');
    console.log('Name:', testName);
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);

    const hashedPassword = await bcrypt.hash(testPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        password: hashedPassword,
        role: 'user',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    console.log('\nTest user created successfully:');
    console.log(JSON.stringify(newUser, null, 2));

    // Verify password
    const userWithPassword = await prisma.user.findUnique({
      where: { email: testEmail },
      select: { password: true },
    });

    if (userWithPassword?.password) {
      const isMatch = await bcrypt.compare(testPassword, userWithPassword.password);
      console.log('\nPassword verification:', isMatch ? 'SUCCESS' : 'FAILED');
      console.log('Password hash:', userWithPassword.password);

      if (!isMatch) {
        console.error('ERROR: Password verification failed!');
      }
    } else {
      console.error('ERROR: Could not retrieve password hash for verification');
    }
  } catch (error) {
    console.error('Error during cleanup and registration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupAndRegister();
