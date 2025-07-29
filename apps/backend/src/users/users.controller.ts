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
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
} from '@nestjs/swagger';
import { UsersService } from './users.service';

// Interface for the user response (without sensitive data)
interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

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

// Extend Express Request type to include our user
interface RequestWithUser extends Request {
  user: {
    userId: string; // The user ID from the JWT token (sub claim)
    email: string; // User's email
    role: UserRole; // User's role
    // For backward compatibility, we'll add id as an alias for userId
    id?: string; // Alias for userId
    // Add sub property for JWT standard claim
    sub?: string; // Standard JWT subject claim (user ID)
  };
}

/**
 * Controller for managing users
 * @class UsersController
 */
@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
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
    pageSize: number
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
    summary: 'Create a new user',
    description: 'Creates a new user account. Requires ADMIN role.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data to create',
    examples: {
      admin: {
        summary: 'Create admin user',
        value: {
          email: 'admin@example.com',
          password: 'securePassword123!',
          name: 'Admin User',
          role: 'ADMIN',
        },
      },
      regular: {
        summary: 'Create regular user',
        value: {
          email: 'user@example.com',
          password: 'password123!',
          name: 'Regular User',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'User successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
        image: { type: 'string', nullable: true },
        emailVerified: { type: 'string', format: 'date-time', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already exists.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(createUserDto);
    // Type assertion is safe here because we know the service returns a user without sensitive data
    return user as unknown as UserResponse;
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
    summary: 'Get all users',
    description: 'Retrieves a paginated list of all users. Requires ADMIN role.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (1-based)',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (max 100)',
    type: Number,
    example: 10,
  })
  @ApiOkResponse({
    description: 'Users retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string' },
              name: { type: 'string' },
              role: { type: 'string', enum: ['USER', 'ADMIN'] },
              image: { type: 'string', nullable: true },
              emailVerified: { type: 'string', format: 'date-time', nullable: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 42 },
            page: { type: 'number', example: 1 },
            pageSize: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 5 },
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Requires ADMIN role.',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<PaginatedResponse<UserResponse>> {
    // Ensure limit is not too large
    limit = Math.min(100, Math.max(1, limit));
    return this.usersService.findAll(page, limit) as unknown as PaginatedResponse<UserResponse>;
  }

  /**
   * Get current authenticated user's profile
   * @param {RequestWithUser} req - The authenticated request
   * @returns {Promise<UserResponse>} The current user's profile
   */
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Retrieves the profile of the currently authenticated user.',
  })
  @ApiOkResponse({
    description: 'Current user profile retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
        image: { type: 'string', nullable: true },
        emailVerified: { type: 'string', format: 'date-time', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Authentication required.',
  })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ description: 'Returns the current user profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getCurrentUser(@Req() req: RequestWithUser): Promise<UserResponse> {
    console.log('--- getCurrentUser ---');
    console.log('Request user object:', req.user);

    if (!req.user) {
      console.error('No user object in request');
      throw new UnauthorizedException('Authentication required');
    }

    // Get user ID from either id or userId property
    const userId = req.user.id || req.user.userId || req.user.sub;

    if (!userId) {
      console.error('No user ID found in request. User object:', req.user);
      throw new UnauthorizedException('Invalid user information');
    }

    console.log('Using user ID for lookup:', userId);

    try {
      console.log('Calling usersService.findOne with ID:', userId);
      const user = await this.usersService.findOne(userId);

      if (!user) {
        console.error('User not found in database');
        throw new UnauthorizedException('User account not found');
      }

      console.log('Found user in database:', {
        id: user.id,
        email: user.email,
        role: user.role,
        hasPassword: 'password' in user ? 'yes' : 'no',
      });

      // Ensure we're not returning sensitive data
      const { password, resetToken, resetTokenExpiry, ...safeUser } = user as any;
      return safeUser as UserResponse;
    } catch (error) {
      console.error('Error in getCurrentUser:', {
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
        error.name === 'NotFoundError' ||
        error.code === 'P2025'
      ) {
        throw new UnauthorizedException('User account not found');
      }

      // If it's already an HTTP exception, re-throw it
      if (error.status) {
        throw error;
      }

      // For any other error, return 500 with a generic message
      throw new InternalServerErrorException('An error occurred while fetching user profile');
    }
  }

  /**
   * Get user by ID
   * Users can view their own profile, admins can view any profile
   * @param {string} id - The ID of the user to retrieve
   * @param {RequestWithUser} req - The authenticated request
   * @returns {Promise<UserResponse>} The requested user
   * @throws {ForbiddenException} If user is not authorized to view the profile
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get user by ID',
    description:
      'Retrieves a user by their ID. Users can view their own profile, admins can view any profile.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'User retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
        image: { type: 'string', nullable: true },
        emailVerified: { type: 'string', format: 'date-time', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser): Promise<UserResponse> {
    console.log(`\n--- findOne ---`);
    console.log(`Looking up user with ID: ${id}`);
    console.log('Request user:', req.user);

    if (!req.user) {
      console.error('No user object in request');
      throw new UnauthorizedException('Authentication required');
    }

    // Get the current user's ID from the JWT token (check multiple possible properties)
    const currentUserId = req.user.id || req.user.userId || req.user.sub;
    const isAdmin = req.user.role === 'ADMIN';

    console.log(`Current user ID: ${currentUserId}, Is admin: ${isAdmin}`);

    // Check if the current user is authorized to view this profile
    if (id !== currentUserId && !isAdmin) {
      console.error(`User ${currentUserId} is not authorized to view user ${id}`);
      throw new ForbiddenException('You are not authorized to view this user');
    }

    try {
      const user = await this.usersService.findOne(id);
      console.log('Found user:', user);
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      // If the error is a 404, rethrow it directly
      if (error.status === 404) {
        throw error;
      }
      // For other errors, throw a more generic error
      throw new InternalServerErrorException('An error occurred while retrieving the user');
    }
  }

  /**
   * Update a user
   * Users can update their own profile, but only admins can update roles
   * @param {string} id - The ID of the user to update
   * @param {UpdateUserDto} updateUserDto - The data to update
   * @param {RequestWithUser} req - The authenticated request
   * @returns {Promise<UserResponse>} The updated user
   * @throws {ForbiddenException} If user is not authorized to update the profile or change roles
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update a user',
    description:
      'Updates a user. Users can update their own profile, but only admins can update roles.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the user to update',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data to update',
    examples: {
      updateName: {
        summary: 'Update name',
        value: {
          name: 'Updated Name',
        },
      },
      updateRole: {
        summary: 'Update role (Admin only)',
        value: {
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'User updated successfully.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
        image: { type: 'string', nullable: true },
        emailVerified: { type: 'string', format: 'date-time', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found - No user exists with the specified ID.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only admins can update user roles.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Authentication required.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser
  ): Promise<UserResponse> {
    console.log('update - User ID from params:', id);
    console.log('update - Update data:', updateUserDto);
    console.log('update - Authenticated user:', {
      id: req.user.id,
      userId: req.user.userId,
      role: req.user.role,
      email: req.user.email,
    });

    // Get the current user's ID (support both id and userId)
    const currentUserId = req.user.id || req.user.userId;

    // Allow users to update their own profile or admins to update any profile
    if (req.user.role !== UserRole.ADMIN && currentUserId !== id) {
      console.log("Forbidden: User is not admin and is trying to update another user's profile");
      throw new ForbiddenException('You can only update your own profile');
    }

    // Only allow admins to update roles
    if (updateUserDto.role && req.user.role !== UserRole.ADMIN) {
      console.log('Forbidden: Non-admin user attempted to update role');
      throw new ForbiddenException('Only administrators can update user roles');
    }

    return this.usersService.update(id, updateUserDto) as unknown as UserResponse;
  }

  /**
   * Delete a user (Admin only)
   * @param {string} id - The ID of the user to delete
   * @returns {Promise<{ message: string }>}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Deletes a user. This action can only be performed by an admin.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the user to delete',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiNoContentResponse({
    description: 'User deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found - No user exists with the specified ID.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only admins can delete users.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Authentication required.',
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
