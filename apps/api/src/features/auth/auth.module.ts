import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { Token } from 'src/entities/Token.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './lib/strategies';
import { JwtUtil } from './lib/utils';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Token]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUtil, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [PassportModule, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
