import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { User, UserRole, SafeUser } from "@workspace/shared";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const defaultName = createUserDto.email.split("@")[0];
    const role = createUserDto.role || UserRole.USER;

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name || defaultName,
        role,
        image: createUserDto.image || null,
      },
    });

    // Convert to SafeUser type which omits sensitive fields
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.user.count(),
    ]);

    // Remove sensitive data from each user
    const sanitizedUsers = users.map((user) => {
      const {
        password,
        resetToken,
        resetTokenExpiry,
        ...userWithoutSensitiveData
      } = user;
      return userWithoutSensitiveData;
    });

    return {
      data: sanitizedUsers,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: string) {
    console.log("\n--- UsersService.findOne ---");
    console.log("Looking up user with ID:", id);

    try {
      // First, check if the user exists in the database
      const allUsers = await this.prisma.user.findMany();
      console.log(
        "All users in database:",
        allUsers.map((u) => ({ id: u.id, email: u.email })),
      );

      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        console.error(
          `User with ID ${id} not found in database. Available users:`,
          allUsers.map((u) => u.id),
        );
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      console.log("Found user:", {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        emailVerified: user.emailVerified,
        image: user.image,
      });

      // Omit sensitive data
      const { password, resetToken, resetTokenExpiry, ...result } = user;

      // Log what we're returning
      console.log("Returning user data (sensitive fields omitted):", {
        ...result,
        hasPassword: "password" in user,
        hasResetToken: "resetToken" in user,
      });

      return result;
    } catch (error) {
      console.error("Error in UsersService.findOne:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
        code: error.code,
        meta: error.meta,
      });

      // Re-throw the error for the controller to handle
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    }) as Promise<User | null>;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data: Partial<{
      name?: string;
      email?: string;
      password?: string;
      currentPassword?: string;
    }> = { ...updateUserDto };

    if (updateUserDto.password) {
      if (!updateUserDto.currentPassword) {
        throw new Error("Current password is required to change password");
      }

      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = (await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })) as SafeUser;

    return updatedUser;
  }

  async remove(id: string): Promise<SafeUser> {
    await this.findOne(id); // Check if user exists

    const deletedUser = (await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })) as SafeUser;

    return deletedUser;
  }
}
