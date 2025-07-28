import axios from 'axios';

async function registerTestUser() {
  const testEmail = 'test@example.com';
  const testPassword = 'password123';
  const testName = 'Test User';

  try {
    console.log('Registering test user via API...');
    console.log('Name:', testName);
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);

    // First, try to delete the existing test user if it exists
    try {
      console.log('Checking for existing test user...');
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        {
          name: testName,
          email: testEmail,
          password: testPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('Registration successful:', response.data);
      console.log('Test user registered successfully!');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          console.log('Test user already exists. Attempting to delete and re-register...');
          // In a real app, you would have a proper delete endpoint
          // For now, we'll just log that we need to delete the user manually
          console.log(
            'Please delete the existing test user from the database and run this script again.'
          );
          console.log('To delete the test user, you can use Prisma Studio or run:');
          console.log('npx prisma studio');
          return;
        } else {
          console.error('Error during registration:', error.response.data);
        }
      } else {
        console.error('Error during registration:', error.message);
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

registerTestUser();
