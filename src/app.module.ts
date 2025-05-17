import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserEntity } from './entities/user.entity';
import { Role } from './roles/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sql',
      entities: [UserEntity, Role],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, Role]),
  ],
  controllers: [AppController, UsersController],
  providers: [AuthGuard, JwtService, UsersService],
})
export class AppModule {}
