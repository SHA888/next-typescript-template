'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  requiredRole = 'user',
  redirectTo = '/auth/signin',
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If not authenticated, redirect to sign-in
      if (!isAuthenticated) {
        router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      // If role is required and user doesn't have it, redirect to home or unauthorized
      if (requiredRole && user?.role !== requiredRole) {
        // You might want to redirect to an unauthorized page or show an error
        console.warn('User does not have required role');
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, requiredRole, router, user, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  // If user doesn't have required role, show nothing (will be redirected)
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  // If authenticated and has required role, render children
  return <>{children}</>;
}
