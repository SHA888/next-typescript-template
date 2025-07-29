import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    register(registerDto: RegisterDto): Promise<Omit<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        role: "USER" | "ADMIN";
        image?: string | null;
        emailVerified?: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    getProfile(req: any): any;
}
