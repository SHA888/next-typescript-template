import { NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';

export async function POST(request: Request) {
  try {
    console.log('Login request received');

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Request body:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body', details: String(parseError) },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log('Attempting to sign in with email:', email);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log('SignIn result:', JSON.stringify(result, null, 2));

      if (!result) {
        console.error('No result from signIn');
        return NextResponse.json(
          { error: 'Authentication failed - no response from auth provider' },
          { status: 401 }
        );
      }

      if (result.error) {
        console.error('Authentication error:', result.error);
        return NextResponse.json(
          {
            error: 'Authentication failed',
            details: result.error,
          },
          { status: 401 }
        );
      }

      console.log('Login successful for user:', email);
      return NextResponse.json({
        success: true,
        message: 'Login successful',
      });
    } catch (authError) {
      console.error('Authentication process error:', authError);
      return NextResponse.json(
        {
          error: 'Authentication process failed',
          details: String(authError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in login endpoint:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
