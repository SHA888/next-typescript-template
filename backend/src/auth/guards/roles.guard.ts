import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

export const ROLES_KEY = 'roles';

// Special role that allows any authenticated user
const ANY_AUTHENTICATED = 'ANY_AUTHENTICATED';

type UserWithRole = {
  id: string;
  role: UserRole;
  [key: string]: unknown;
};

type AllowedRoles = UserRole | typeof ANY_AUTHENTICATED;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AllowedRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) as (UserRole | typeof ANY_AUTHENTICATED)[];

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserWithRole | undefined;

    // Special case for ANY_AUTHENTICATED role
    if (requiredRoles.includes(ANY_AUTHENTICATED)) {
      if (!user) {
        throw new ForbiddenException('Authentication required');
      }
      return true;
    }

    if (!user || !user.role) {
      throw new ForbiddenException('User does not have valid roles');
    }

    // Filter out ANY_AUTHENTICATED from required roles if present
    const rolesToCheck = requiredRoles.filter((role) => role !== ANY_AUTHENTICATED) as UserRole[];

    const hasRole = rolesToCheck.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        `User with role ${user.role} does not have access to this route. ` +
          `Required roles: ${rolesToCheck.join(', ')}`
      );
    }

    return true;
  }
}
