import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authConfig as authOptions } from '../../../../src/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('=== SIMPLE PROTECTED ROUTE HIT ===');

    // Get the session
    const session = await getServerSession(authOptions);
    console.log('Session in simple route:', session ? 'exists' : 'missing');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'This is a protected route',
      user: {
        id: session.user?.id,
        email: session.user?.email,
        role: session.user?.role,
      },
    });
  } catch (error) {
    console.error('Error in simple protected route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
