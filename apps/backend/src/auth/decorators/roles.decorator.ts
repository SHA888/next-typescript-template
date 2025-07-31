import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@workspace/shared";

export const ROLES_KEY = "roles";
export const Roles = (...roles: (keyof typeof UserRole)[]) =>
  SetMetadata(ROLES_KEY, roles);
