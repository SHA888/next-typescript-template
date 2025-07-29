'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the LoginForm component with SSR disabled
const LoginForm = dynamic(() => import('@/components/auth/LoginForm'), { ssr: false });

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* Login Form Component */}
        <LoginForm />
      </div>
    </div>
  );
}
