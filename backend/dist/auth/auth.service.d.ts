import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
type User = {
    id: string;
    email: string;
    name: string | null;
    password: string;
    role: 'USER' | 'ADMIN';
    image?: string | null;
    emailVerified?: Date | null;
    createdAt: Date;
    updatedAt: Date;
};
export interface JwtPayload {
    email: string;
    sub: string;
    role: string;
}
export interface AuthResponse {
    access_token: string;
    user: Omit<User, 'password'>;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    register(registerDto: RegisterDto): Promise<Omit<User, 'password'>>;
    validateUserById(userId: string): Promise<Omit<User, 'password'> | null>;
}
export {};
