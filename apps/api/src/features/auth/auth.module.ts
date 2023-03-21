import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './lib/strategies';
import { CookieService } from './cookie.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    CookieService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  exports: [PassportModule, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
