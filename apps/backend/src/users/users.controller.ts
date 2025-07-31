import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  HttpStatus,
  HttpCode,
  Req,
  DefaultValuePipe,
  ParseIntPipe,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { User as SharedUser, UserRole, SafeUser } from "@workspace/shared";
// Simplified type for authenticated user from JWT
interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
  id?: string;
  sub?: string;
}

// Type guard for authenticated user
function isAuthenticatedUser(user: any): user is AuthenticatedUser {
  return user && typeof user === 'object' && 'userId' in user && 'email' in user && 'role' in user;
}
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";

// Import ApiInternalServerErrorResponse
import { ApiInternalServerErrorResponse } from "@nestjs/swagger";

// Interface for paginated response
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// Alias for backward compatibility
type UserResponse = SafeUser;

/**
 * Controller for managing users
 * @class UsersController
 */
@ApiTags("Users")
@Controller("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiUnauthorizedResponse({ description: "Unauthorized" })
@ApiForbiddenResponse({ description: "Forbidden - Insufficient permissions" })
export class UsersController {
  /**
   * Creates an instance of UsersController
   * @param {UsersService} usersService - The users service
   */
  constructor(private readonly usersService: UsersService) {}

  // Helper method to handle pagination response
  private createPaginationResponse<T>(
    data: T[],
    total: number,
    page: number,
    pageSize: number,
  ): PaginatedResponse<T> {
    return {
      data,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  /**
   * Create a new user (Admin only)
   * @param {CreateUserDto} createUserDto - The user data to create
   * @returns {Promise<UserResponse>} The created user
   */
  @Post()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new user",
    description: "Creates a new user account. Requires ADMIN role.",
  })
  @ApiBody({
    type: CreateUserDto,
    description: "User data to create",
    examples: {
      admin: {
        summary: "Create admin user",
        value: {
          email: "admin@example.com",
          password: "securePassword123!",
          name: "Admin User",
          role: "ADMIN",
        },
      },
      regular: {
        summary: "Create regular user",
        value: {
          email: "user@example.com",
          password: "password123!",
          name: "Regular User",
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: "User successfully created.",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        role: { type: "string", enum: ["USER", "ADMIN"] },
        image: { type: "string", nullable: true },
        emailVerified: { type: "string", format: "date-time", nullable: true },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data.",
  })
  @ApiForbiddenResponse({
    description: "Forbidden - Insufficient permissions.",
  })
  @ApiResponse({
    status: 409,
    description: "Conflict - Email already exists.",
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(createUserDto);
    // Type assertion is safe here because we know the service returns a user without sensitive data
    return user as unknown as UserResponse;
  }

  /**
   * Register a new user
   * @param {CreateUserDto} createUserDto - The user data to create
   * @returns {Promise<SafeUser>} The created user
   */
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string", nullable: true },
        role: { type: "string", enum: Object.values(UserRole) },
        image: { type: "string", nullable: true },
        emailVerified: { type: "string", format: "date-time", nullable: true },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 409, description: "Email already exists" })
  async register(@Body() createUserDto: CreateUserDto): Promise<SafeUser> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.code === "P2002") {
        // Prisma unique constraint violation
        throw new ConflictException("Email already exists");
      }
      throw new InternalServerErrorException("Failed to create user");
    }
  }

  /**
   * Get all users with pagination (Admin only)
   * @param {number} page - Page number (1-based)
   * @param {number} limit - Number of items per page (max 100)
   * @returns {Promise<PaginatedResponse<UserResponse>>} Paginated list of users
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: "Get all users",
    description:
      "Retrieves a paginated list of all users. Requires ADMIN role.",
  })
  @ApiQuery({
    name: "page",
    required: false,
    description: "Page number (1-based)",
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Number of items per page (max 100)",
    type: Number,
    example: 10,
  })
  @ApiOkResponse({
    description: "Users retrieved successfully.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              role: { type: "string", enum: ["USER", "ADMIN"] },
              image: { type: "string", nullable: true },
              emailVerified: {
                type: "string",
                format: "date-time",
                nullable: true,
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        meta: {
          type: "object",
          properties: {
            total: { type: "number" },
            page: { type: "number" },
            pageSize: { type: "number" },
            totalPages: { type: "number" },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Admin access required",
  })
  async findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<PaginatedResponse<SafeUser>> {
    // Ensure limit is not too high
    limit = Math.min(100, Math.max(1, limit));

    const result = await this.usersService.findAll(page, limit);
    return this.createPaginationResponse(
      result.data,
      result.meta.total,
      page,
      limit,
    );
  }

  /**
   * Get current authenticated user's profile
   * @param {Request} req - The authenticated request
   * @returns {Promise<UserResponse>} The current user's profile
   */
  @Get("me")
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({
    summary: "Get current user profile",
    description: "Retrieves the profile of the currently authenticated user.",
  })
  @ApiOkResponse({
    description: "Current user profile retrieved successfully.",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        role: { type: "string", enum: ["USER", "ADMIN"] },
        image: { type: "string", nullable: true },
        emailVerified: { type: "string", format: "date-time", nullable: true },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Authentication required",
  })
  @ApiForbiddenResponse({
    description: "Forbidden - Insufficient permissions",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async getCurrentUser(@Req() req: Request): Promise<UserResponse> {
    console.log("--- getCurrentUser ---");
    console.log("Request user object:", req.user);

    if (!req.user) {
      console.error("No user object in request");
      throw new UnauthorizedException("Authentication required");
    }

    // Use type guard to ensure we have the right user type
    let userId: string | undefined;
    let userEmail: string | undefined;
    let userRole: UserRole | undefined;

    if (isAuthenticatedUser(req.user)) {
      // Handle AuthenticatedUser type
      const authUser = req.user as AuthenticatedUser;
      userId = authUser.id || authUser.userId || authUser.sub;
      userEmail = authUser.email;
      userRole = authUser.role;
    } else if ("id" in req.user) {
      // Handle Prisma User type
      const prismaUser = req.user as any; // Temporary any to access properties
      userId = prismaUser.id || prismaUser.userId || prismaUser.sub;
      userEmail = prismaUser.email;
      userRole = prismaUser.role as UserRole;
    } else {
      // Fallback for any other case
      console.error("Unexpected user type in request:", req.user);
      throw new UnauthorizedException("Invalid user information");
    }

    if (!userId) {
      console.error("No user ID found in request. User object:", req.user);
      throw new UnauthorizedException("Invalid user information");
    }

    // The userId check is already done above

    console.log("Using user ID for lookup:", userId);

    try {
      console.log("Calling usersService.findOne with ID:", userId);
      const user = await this.usersService.findOne(userId);

      if (!user) {
        console.error("User not found in database");
        throw new UnauthorizedException("User account not found");
      }

      // Create a type-safe version of the user object for logging
      const userForLogging = {
        id: (user as any).id,
        email: user.email,
        role: user.role,
        hasPassword: "password" in user ? "yes" : "no",
      };

      console.log("Found user in database:", userForLogging);

      // Ensure we're not returning sensitive data
      const { password, resetToken, resetTokenExpiry, ...safeUser } =
        user as any;
      return safeUser as UserResponse;
    } catch (error) {
      console.error("Error in getCurrentUser:", {
        error: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        statusCode: error.status,
        response: error.response,
      });

      // If user not found, return 401 Unauthorized since the token is valid but user doesn't exist
      if (
        error instanceof NotFoundException ||
        error.name === "NotFoundError" ||
        error.code === "P2025"
      ) {
        throw new UnauthorizedException("User account not found");
      }

      // If it's already an HTTP exception, re-throw it
      if (error.status) {
        throw error;
      }

      // For any other error, return 500 with a generic message
      throw new InternalServerErrorException(
        "An error occurred while fetching user profile",
      );
    }
  }

  /**
   * Get user by ID
   * Users can view their own profile, admins can view any profile
   * @param {string} id - The ID of the user to retrieve
   * @param {Request} req - The authenticated request
   * @returns {Promise<UserResponse>} The requested user
   * @throws {ForbiddenException} If user is not authorized to view the profile
   */
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({
    summary: "Get user by ID",
    description:
      "Retrieves a user by their ID. Users can view their own profile, admins can view any profile.",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "User ID",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @ApiOkResponse({
    description: "User retrieved successfully.",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        role: { type: "string", enum: ["USER", "ADMIN"] },
        image: { type: "string", nullable: true },
        emailVerified: { type: "string", format: "date-time", nullable: true },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  })
  async findOne(
    @Param("id") id: string,
    @Req() req: Request,
  ): Promise<UserResponse> {
    console.log(`\n--- findOne ---`);
    console.log(`Looking up user with ID: ${id}`);
    console.log("Request user:", req.user);

    if (!req.user) {
      console.error("No user object in request");
      throw new UnauthorizedException("Authentication required");
    }

    // Extract user information safely
    let currentUserId: string | undefined;
    let isAdmin = false;

    if (isAuthenticatedUser(req.user)) {
      // Handle AuthenticatedUser type
      const authUser = req.user as AuthenticatedUser;
      currentUserId = authUser.id || authUser.userId || authUser.sub;
      isAdmin = authUser.role === UserRole.ADMIN;
    } else if ("id" in req.user) {
      // Handle Prisma User type
      const prismaUser = req.user as any;
      currentUserId = prismaUser.id || prismaUser.userId || prismaUser.sub;
      isAdmin = prismaUser.role === UserRole.ADMIN;
    } else {
      console.error("Unexpected user type in request:", req.user);
      throw new UnauthorizedException("Invalid user information");
    }

    if (!currentUserId) {
      console.error("No user ID found in request. User object:", req.user);
      throw new UnauthorizedException("Invalid user information");
    }

    console.log(`Current user ID: ${currentUserId}, Is admin: ${isAdmin}`);

    try {
      // Check if the user exists first
      const user = await this.usersService.findOne(id);

      // Check if the current user is authorized to view this profile
      // Allow access if user is an admin OR if the requested ID matches the current user's ID
      if (id !== currentUserId && !isAdmin) {
        console.error(
          `User ${currentUserId} is not authorized to view user ${id}`,
        );
        throw new ForbiddenException(
          "You are not authorized to view this user",
        );
      }

      // Create a type-safe version of the user object for logging
      const userForLogging = {
        id: (user as any).id,
        email: user.email,
        role: user.role,
        name: (user as any).name,
      };

      console.log("Found user:", userForLogging);

      // Ensure we're not returning sensitive data
      const { password, resetToken, resetTokenExpiry, ...safeUser } =
        user as any;
      return safeUser as UserResponse;
    } catch (error) {
      console.error("Error in findOne:", {
        message: error.message,
        name: error.name,
        code: error.code,
        status: error.status,
      });

      // If it's a known error, rethrow it
      if (
        error instanceof ForbiddenException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // For Prisma not found error
      if (error.code === "P2025" || error.name === "NotFoundError") {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // For other errors, throw a more generic error
      throw new InternalServerErrorException(
        "An error occurred while retrieving the user",
      );
    }
  }

  /**
   * Update a user
   * Users can update their own profile, but only admins can update roles
   * @param {string} id - The ID of the user to update
   * @param {UpdateUserDto} updateUserDto - The data to update
   * @param {Request} req - The authenticated request
   * @returns {Promise<UserResponse>} The updated user
   * @throws {ForbiddenException} If user is not authorized to update the profile or change roles
   */
  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({
    summary: "Update a user",
    description:
      "Updates a user. Users can update their own profile, but only admins can update roles.",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "ID of the user to update",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @ApiBody({
    type: UpdateUserDto,
    description: "User data to update",
    examples: {
      updateName: {
        summary: "Update name",
        value: {
          name: "Updated Name",
        },
      },
      updateRole: {
        summary: "Update role (Admin only)",
        value: {
          role: "ADMIN",
        },
      },
    },
  })
  @ApiOkResponse({
    description: "User updated successfully.",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        role: { type: "string", enum: ["USER", "ADMIN"] },
        image: { type: "string", nullable: true },
        emailVerified: { type: "string", format: "date-time", nullable: true },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  })
  @ApiNotFoundResponse({
    description: "User not found - No user exists with the specified ID.",
  })
  @ApiForbiddenResponse({
    description: "Forbidden - Only admins can update user roles.",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Authentication required.",
  })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<UserResponse> {
    console.log("\n--- update ---");
    console.log("Updating user with ID:", id);
    console.log("Update data:", updateUserDto);

    if (!req.user) {
      console.error("No user object in request");
      throw new UnauthorizedException("Authentication required");
    }

    // Extract user information safely
    let currentUserId: string | undefined;
    let isAdmin = false;

    if (isAuthenticatedUser(req.user)) {
      // Handle AuthenticatedUser type
      const authUser = req.user as AuthenticatedUser;
      currentUserId = authUser.id || authUser.userId || authUser.sub;
      isAdmin = authUser.role === UserRole.ADMIN;
    } else if ("id" in req.user) {
      // Handle Prisma User type
      const prismaUser = req.user as any;
      currentUserId = prismaUser.id || prismaUser.userId || prismaUser.sub;
      isAdmin = prismaUser.role === UserRole.ADMIN;
    } else {
      console.error("Unexpected user type in request:", req.user);
      throw new UnauthorizedException("Invalid user information");
    }

    if (!currentUserId) {
      console.error("No user ID found in request. User object:", req.user);
      throw new UnauthorizedException("Invalid user information");
    }

    console.log("Authenticated user:", {
      id: currentUserId,
      isAdmin,
      role: isAdmin ? UserRole.ADMIN : UserRole.USER,
    });

    console.log(`Current user ID: ${currentUserId}, Is admin: ${isAdmin}`);

    try {
      // Check if the user exists first
      const existingUser = await this.usersService.findOne(id);
      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Check if the current user is authorized to update this profile
      // Allow access if user is an admin OR if the requested ID matches the current user's ID
      if (id !== currentUserId && !isAdmin) {
        console.error(
          `User ${currentUserId} is not authorized to update user ${id}`,
        );
        throw new ForbiddenException("You can only update your own profile");
      }

      // Only allow admins to update roles
      if (updateUserDto.role && !isAdmin) {
        console.log("Forbidden: Non-admin user attempted to update role");
        throw new ForbiddenException(
          "Only administrators can update user roles",
        );
      }

      // If user is not an admin, make sure they're not trying to update sensitive fields
      if (!isAdmin) {
        const restrictedFields = ["role", "isActive", "emailVerified"];
        const attemptedRestrictedUpdate = Object.keys(updateUserDto).some(
          (field) => restrictedFields.includes(field),
        );

        if (attemptedRestrictedUpdate) {
          console.log(
            "Forbidden: Non-admin user attempted to update restricted fields",
          );
          throw new ForbiddenException(
            "You are not authorized to update this field",
          );
        }
      }

      console.log("Proceeding with update...");
      const updatedUser = await this.usersService.update(id, updateUserDto);

      console.log("User updated successfully:", {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        name: updatedUser.name,
      });

      return updatedUser as unknown as UserResponse;
    } catch (error) {
      console.error("Error in update:", {
        message: error.message,
        name: error.name,
        code: error.code,
        status: error.status,
      });

      // If it's a known error, rethrow it
      if (
        error instanceof ForbiddenException ||
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      // For Prisma not found error
      if (error.code === "P2025" || error.name === "NotFoundError") {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // For other errors, throw a more generic error
      throw new InternalServerErrorException(
        "An error occurred while updating the user",
      );
    }
  }

  /**
   * Delete a user (Admin only)
   * @param {string} id - The ID of the user to delete
   * @returns {Promise<{ message: string }>}
   */
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: "Delete a user",
    description:
      "Deletes a user. This action can only be performed by an admin.",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "ID of the user to delete",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @ApiNoContentResponse({
    description: "User deleted successfully.",
  })
  @ApiNotFoundResponse({
    description: "User not found - No user exists with the specified ID.",
  })
  @ApiForbiddenResponse({
    description: "Forbidden - Only admins can delete users.",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized - Authentication required.",
  })
  async remove(@Param("id") id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: "User deleted successfully" };
  }
}
