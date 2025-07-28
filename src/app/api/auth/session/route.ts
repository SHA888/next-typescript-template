import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authConfig as authOptions } from '../../../../../src/auth';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';

function logRequestDetails() {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const requestHeaders = headers();

    console.log('=== SESSION CHECK REQUEST DETAILS ===');
    console.log('All cookies:', JSON.stringify(allCookies, null, 2));
    console.log('Authorization header:', requestHeaders.get('authorization'));
    console.log('All headers:');
    requestHeaders.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    // Log environment variables that might affect session handling
    console.log('Environment:');
    console.log('  NODE_ENV:', process.env.NODE_ENV);
    console.log('  NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
    console.log('  NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '***' : 'Not set');

    return { allCookies };
  } catch (error) {
    console.error('Error in logRequestDetails:', error);
    return { allCookies: [] };
  }
}

export async function GET() {
  try {
    // Log request details
    logRequestDetails();

    console.log('=== GETTING SESSION ===');
    console.log('Auth options:', {
      ...authOptions,
      // Don't log sensitive data
      providers: authOptions.providers?.map((p) => {
        const provider = p as { id?: string; name?: string; type?: string; options?: unknown };
        return {
          ...provider,
          options: provider.options ? '[REDACTED]' : undefined,
        };
      }),
    });

    const session = await getServerSession(authOptions);
    console.log('Session retrieved:', session ? 'exists' : 'null');

    return NextResponse.json({
      isAuthenticated: !!session,
      session: session
        ? {
            user: {
              id: session.user?.id,
              email: session.user?.email,
              role: session.user?.role,
            },
            expires: session.expires,
          }
        : null,
    });
  } catch (error) {
    console.error('Error in session check:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}
