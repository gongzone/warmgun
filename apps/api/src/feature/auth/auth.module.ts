import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from 'src/entity/User.entity';
import Token from 'src/entity/Token.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './lib/strategies';
import { JwtUtil } from './lib/utils';

@Module({
  imports: [MikroOrmModule.forFeature([User, Token]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtUtil, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
