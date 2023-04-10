import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';

@Global()
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, CookieService],
  exports: [JwtModule, CookieService],
})
export class AuthModule {}
