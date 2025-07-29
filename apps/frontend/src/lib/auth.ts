import type { NextAuthOptions, DefaultSession, Session, User as AuthUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaClient, User as PrismaUser } from '@prisma/client';

// Extend NextAuth types to include role in session
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession['user'];
  }

  // Extend the built-in user type
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  // Extend the built-in JWT type
  interface JWT {
    id: string;
    email?: string | null;
    name?: string | null;
    picture?: string | null;
    sub?: string;
    role?: string;
  }
}

const prisma = new PrismaClient();

// Enable debug logging for development
const debug = process.env.NODE_ENV === 'development';

function log(...args: unknown[]) {
  if (debug) {
    console.log('[NextAuth]', ...args);
  }
}

export const authOptions: NextAuthOptions = {
  debug: debug, // Enable debug mode in development
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        log('Authorize called with credentials:', {
          email: credentials?.email ? `${credentials.email.substring(0, 3)}...` : 'none',
          hasPassword: !!credentials?.password,
        });

        if (!credentials?.email || !credentials?.password) {
          log('Missing email or password');
          return null;
        }

        try {
          log('Looking up user by email:', credentials.email);
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            log('No user found with email:', credentials.email);
            return null;
          }

          if (!user.password) {
            log('User has no password set (possibly signed up with OAuth)');
            return null;
          }

          log('User found, comparing passwords...');
          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isValidPassword) {
            log('Invalid password for user:', credentials.email);
            return null;
          }

          log('Authentication successful for user:', user.email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: (user as PrismaUser & { role?: string }).role || 'user',
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      log('Session callback - token:', {
        id: token.id ? `${token.id.substring(0, 3)}...` : 'none',
        role: token.role,
        email: token.email,
      });

      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role || 'user',
          },
        };
      }

      log('Session callback - returning session:', {
        userId: session.user?.id ? `${session.user.id.substring(0, 3)}...` : 'none',
        role: session.user?.role,
        email: session.user?.email,
      });

      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: AuthUser }) {
      log('JWT callback - token:', {
        id: token.id ? `${token.id.substring(0, 3)}...` : 'none',
        role: token.role,
        email: token.email,
      });

      if (user) {
        log('JWT callback - adding user data to token:', {
          id: user.id ? `${user.id.substring(0, 3)}...` : 'none',
          role: (user as AuthUser & { role?: string }).role,
          email: user.email,
        });
        token.id = user.id;
        token.role = (user as AuthUser & { role?: string }).role;
      }

      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Custom error page
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  logger: debug
    ? {
        error(code, metadata) {
          console.error('NextAuth Error:', code, metadata);
        },
        warn(code) {
          console.warn('NextAuth Warning:', code);
        },
        debug(code, metadata) {
          console.log('NextAuth Debug:', code, metadata);
        },
      }
    : undefined,
};
