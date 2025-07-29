import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Simulate a successful login
    const user = {
      id: 'test-user-123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    };

    // Create a session token (simplified)
    const sessionToken = 'test-session-token';

    // Set a cookie manually
    cookies().set({
      name: 'next-auth.session-token',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.json({
      success: true,
      message: 'Test login successful',
      user,
      sessionToken,
    });
  } catch (error) {
    console.error('Error in test login:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
