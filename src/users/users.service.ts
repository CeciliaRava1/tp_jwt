import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Role } from 'src/roles/role.entity'; 
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    private jwtService: JwtService,
  ) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  canDo(user: UserEntity, permission: string): boolean {
    const result = user.permissionCodes.includes(permission);
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async register(body: RegisterDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, body);
      user.password = hashSync(user.password, 10);
      await this.userRepo.save(user);
      return { status: 'created' };
    } catch (error) {
      throw new HttpException('Error de creación', 500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo.findOneBy({ email });
  }

  async assignRole(userId: number, roleId: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) throw new HttpException('Usuario no encontrado', 404);

    const role = await this.roleRepo.findOneBy({ id: roleId });
    if (!role) throw new HttpException('Rol no encontrado', 404);

    user.roles.push(role);
    return this.userRepo.save(user);
  }
}
