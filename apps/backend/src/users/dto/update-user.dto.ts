import { PartialType } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  IsEnum,
} from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { UserRole } from "@workspace/shared";

export const ALLOWED_USER_ROLES = Object.values(UserRole).filter(
  (value) => typeof value === 'string'
) as string[];

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  currentPassword?: string;

  @IsEnum(UserRole, { message: 'Invalid role' })
  @IsOptional()
  role?: UserRole;
}
