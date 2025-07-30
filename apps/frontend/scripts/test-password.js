import bcrypt from 'bcryptjs';
import { PrismaClient } from '@app/database';

const prisma = new PrismaClient();

async function testPassword() {
  try {
    // Get the test user
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
      select: { id: true, email: true, password: true },
    });

    if (!user) {
      console.log('Test user not found');
      return;
    }

    console.log('Testing password for user:', user.email);

    // Test password comparison
    const testPassword = 'password123';
    console.log('Testing password:', testPassword);
    console.log('Stored hash:', user.password);

    // Compare the password
    const isMatch = await bcrypt.compare(testPassword, user.password);
    console.log('Password match:', isMatch);

    // If no match, try to regenerate the hash with the same password
    if (!isMatch) {
      console.log('Original password does not match. Testing hash regeneration...');
      const newHash = await bcrypt.hash(testPassword, 10);
      console.log('New hash:', newHash);
      console.log('Compare with new hash:', await bcrypt.compare(testPassword, newHash));
    }
  } catch (error) {
    console.error('Error testing password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPassword();
