import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
  Matches,
  IsUrl,
  IsEnum,
} from "class-validator";
import UserRole from "@app/database";

export class RegisterDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/(?=.*[a-z])/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/(?=.*[0-9])/, {
    message: "Password must contain at least one number",
  })
  @Matches(/(?=.*[!@#$%^&*])/, {
    message: "Password must contain at least one special character (!@#$%^&*)",
  })
  password!: string;

  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name cannot be empty" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Image must be a string" })
  @IsUrl({}, { message: "Image must be a valid URL" })
  image?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: "Invalid user role" })
  role?: typeof UserRole;
}
