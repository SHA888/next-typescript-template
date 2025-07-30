import { PrismaClient } from "@prisma/client";
type PrismaUser = Awaited<ReturnType<PrismaClient["user"]["findUnique"]>>;
import { User as SharedUser, UserRole } from "@workspace/shared";

/**
 * Represents the user information stored in the JWT token and available in the request
 * This is a subset of the full User model, containing only the fields needed for authentication
 */
export interface AuthenticatedUser {
  userId: string; // The user ID from the JWT token (sub claim)
  email: string; // User's email
  role: UserRole; // User's role from shared types
  id?: string; // Alias for userId
  sub?: string; // Standard JWT subject claim (user ID)
}

// Extend Express Request type to include our user
declare module "express" {
  interface Request {
    // The user property can be either our AuthenticatedUser or a full User from Prisma
    // This makes it compatible with both our JWT strategy and any other middleware that might attach a full user
    user?: AuthenticatedUser | PrismaUser | SharedUser;
  }
}

// Type guard to check if an object is an AuthenticatedUser
export function isAuthenticatedUser(user: unknown): user is AuthenticatedUser {
  return (
    user &&
    typeof user === "object" &&
    "userId" in user &&
    "email" in user &&
    "role" in user
  );
}
