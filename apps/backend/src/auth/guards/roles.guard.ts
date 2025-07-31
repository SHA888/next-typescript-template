import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "@workspace/shared";

export const ROLES_KEY = "roles";

// Special role that allows any authenticated user
const ANY_AUTHENTICATED = "ANY_AUTHENTICATED";

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
    const requiredRoles = this.reflector.getAllAndOverride<AllowedRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    ) as (UserRole | typeof ANY_AUTHENTICATED)[];

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserWithRole | undefined;

    // If no user is present, throw 401 Unauthorized
    if (!user) {
      throw new ForbiddenException("Authentication required");
    }

    // Special case for ANY_AUTHENTICATED role - allow any authenticated user
    if (requiredRoles.includes(ANY_AUTHENTICATED)) {
      return true;
    }

    if (!user.role) {
      throw new ForbiddenException("User does not have a valid role");
    }

    // Filter out ANY_AUTHENTICATED from required roles if present
    const rolesToCheck = requiredRoles.filter(
      (role): role is keyof typeof UserRole => role !== ANY_AUTHENTICATED,
    );

    const hasRole = rolesToCheck.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        `User with role ${String(user.role)} does not have access to this route. ` +
          `Required roles: ${rolesToCheck.join(", ")}`,
      );
    }

    return true;
  }
}
