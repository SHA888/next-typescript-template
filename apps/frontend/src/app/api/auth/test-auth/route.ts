import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../../../../../src/auth';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Get all request headers and cookies first
    const requestHeaders = headers();
    const cookieHeader = requestHeaders.get('cookie') || '';
    const allCookies = Object.fromEntries(
      cookieHeader
        .split(';')
        .map((c) => c.trim().split('='))
        .filter(([key]) => key)
    );

    // 2. Test database connection
    const userCount = await prisma.user.count();

    // 3. Test session retrieval with detailed logging
    console.log('=== SESSION DEBUG ===');
    console.log('Cookies in request:', JSON.stringify(allCookies, null, 2));

    // 4. Get session with auth config
    console.log('Getting session with config:', {
      ...authConfig,
      secret: authConfig.secret ? '***' : 'Not set',
      providers: authConfig.providers?.map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
      })),
    });

    const session = await getServerSession(authConfig);
    console.log('Session retrieved:', session ? 'exists' : 'null');

    // 5. Check environment variables
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'Not set',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '***' : 'Not set',
      DATABASE_URL: process.env.DATABASE_URL ? '***' : 'Not set',
    };

    // 6. Get all request headers
    const headersObj: Record<string, string> = {};
    requestHeaders.forEach((value, key) => {
      headersObj[key] = value;
    });

    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        userCount,
      },
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
      environment: envVars,
      request: {
        cookies: allCookies,
        hasAuthHeader: !!requestHeaders.get('authorization'),
        headers: headersObj,
      },
      debug: {
        authConfig: {
          ...authConfig,
          secret: authConfig.secret ? '***' : 'Not set',
          providers: authConfig.providers?.map((p) => ({
            id: p.id,
            name: p.name,
            type: p.type,
          })),
        },
      },
    });
  } catch (error) {
    console.error('Auth test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Auth test failed',
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
