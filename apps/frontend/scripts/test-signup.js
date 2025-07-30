import { PrismaClient } from '@app/database';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testSignup() {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'testpassword123';
  const testName = 'Test User';

  try {
    console.log('Testing user signup with:');
    console.log('Name:', testName);
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);

    // Hash the password
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    console.log('Hashed password:', hashedPassword);

    // Create the user directly in the database
    const user = await prisma.user.create({
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
        password: true,
      },
    });

    console.log('User created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      passwordHash: user.password ? `${user.password.substring(0, 10)}...` : 'No password',
    });

    // Test password verification
    const isMatch = await bcrypt.compare(testPassword, user.password);
    console.log('Password verification:', isMatch ? 'SUCCESS' : 'FAILED');

    if (!isMatch) {
      console.log('Password verification failed. Details:');
      console.log('Original password:', testPassword);
      console.log('Stored hash:', user.password);
      console.log('New hash from same password:', await bcrypt.hash(testPassword, 10));
    }

    return user;
  } catch (error) {
    console.error('Error during test signup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testSignup()
  .then(() => console.log('Test completed'))
  .catch(console.error);
