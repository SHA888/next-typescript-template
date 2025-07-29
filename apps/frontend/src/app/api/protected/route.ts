import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authConfig as authOptions } from '../../../../src/auth';
import { cookies, headers } from 'next/headers';

// Debug function to log request details
function logRequestDetails() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  const requestHeaders = headers();

  console.log('=== REQUEST DETAILS ===');
  console.log(
    'Cookies:',
    allCookies.map((c) => c.name)
  );
  console.log('Authorization header:', requestHeaders.get('authorization'));

  return { allCookies };
}

export const dynamic = 'force-dynamic'; // Ensure the route is not statically generated

export async function GET() {
  try {
    // Log request details and get cookies
    console.log('=== PROTECTED ROUTE HIT ===');
    const { allCookies } = logRequestDetails();

    // Get the session
    console.log('=== GETTING SESSION ===');
    const session = await getServerSession(authOptions);

    // Log session information
    console.log('Session found:', !!session);
    if (session) {
      console.log('Session user ID:', session.user?.id);
      console.log('Session user role:', session.user?.role);
    }

    if (!session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          debug: {
            hasSession: false,
            cookies: allCookies.map((c) => ({ name: c.name, value: c.value })),
          },
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'This is a protected route',
      user: session.user,
    });
  } catch (error) {
    console.error('Error in protected route:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
