import { Repository } from 'typeorm';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Role } from 'src/roles/role.entity';
import { JwtService } from 'src/jwt/jwt.service';
export declare class UsersService {
    private userRepo;
    private roleRepo;
    private jwtService;
    constructor(userRepo: Repository<UserEntity>, roleRepo: Repository<Role>, jwtService: JwtService);
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    canDo(user: UserEntity, permission: string): boolean;
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    findByEmail(email: string): Promise<UserEntity>;
    assignRole(userId: number, roleId: number): Promise<UserEntity>;
}
