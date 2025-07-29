import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

type RouteConfig = {
  path: string;
  roles?: string[];
};

// List of public paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/api/auth/signin',
  '/api/auth/signup',
  '/api/auth/forgot-password',
  '/api/auth/validate-reset-token',
  '/api/auth/reset-password',
  '/api/auth/[...nextauth]',
];

// List of API paths that don't require authentication
const publicApiPaths = [
  '/api/auth/',
  // Add other public API paths here
];

// Define role-based route configurations
const protectedRoutes: RouteConfig[] = [
  // Admin routes
  { path: '/admin', roles: ['admin'] },
  { path: '/api/admin', roles: ['admin'] },

  // User dashboard routes (accessible by authenticated users with any role)
  { path: '/dashboard' },
  { path: '/api/dashboard' },

  // Add more protected routes as needed
];

// Function to check if the user has required role for the path
function hasRequiredRole(pathname: string, userRole: string | undefined): boolean {
  // Find the most specific route configuration that matches the path
  const routeConfig = protectedRoutes
    .filter((route) => pathname.startsWith(route.path))
    .sort((a, b) => b.path.length - a.path.length)[0];

  // If no specific route config is found, allow access
  if (!routeConfig) return true;

  // If no roles are specified, any authenticated user can access
  if (!routeConfig.roles || routeConfig.roles.length === 0) return true;

  // Check if user has one of the required roles
  return userRole ? routeConfig.roles.includes(userRole) : false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle API routes
  if (pathname.startsWith('/api')) {
    // Check if it's a public API path
    const isPublicApi = publicApiPaths.some((path) => pathname.startsWith(path));

    if (isPublicApi) {
      return handleApiResponse(request);
    }

    // Check authentication for protected API routes
    const token = await getToken({ req: request });
    if (!token) {
      return new NextResponse(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check role-based access for API routes
    const userRole = token.role as string | undefined;
    if (!hasRequiredRole(pathname, userRole)) {
      return new NextResponse(JSON.stringify({ error: 'Insufficient permissions' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return handleApiResponse(request);
  }

  // Handle page routes
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const userRole = token?.role as string | undefined;

  // Redirect to sign-in if not authenticated and trying to access protected page
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check role-based access for page routes
  if (isAuthenticated && !hasRequiredRole(pathname, userRole)) {
    // Redirect to dashboard or home if user doesn't have required role
    const redirectUrl = new URL(userRole === 'admin' ? '/admin' : '/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

function handleApiResponse(request: NextRequest) {
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
