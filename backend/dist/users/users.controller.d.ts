import { Request } from 'express';
import { UserRole } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
interface RequestWithUser extends Request {
    user: {
        id: string;
        email: string;
        role: UserRole;
    };
}
export interface PaginationMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private createPaginationResponse;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            image: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    getCurrentUser(req: RequestWithUser): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string, req: RequestWithUser): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, req: RequestWithUser): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
}
export {};
