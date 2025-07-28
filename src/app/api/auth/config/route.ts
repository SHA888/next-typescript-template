import { NextResponse } from 'next/server';
import { authConfig } from '../../../../../src/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Return a sanitized version of the auth config (without sensitive data)
    return NextResponse.json({
      success: true,
      config: {
        ...authConfig,
        // Don't include sensitive data in the response
        providers: authConfig.providers?.map((provider) => ({
          id: provider.id,
          name: provider.name,
          type: provider.type,
        })),
        // Don't include the secret in the response
        secret: authConfig.secret ? '[REDACTED]' : undefined,
      },
    });
  } catch (error) {
    console.error('Error retrieving auth config:', error);
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
