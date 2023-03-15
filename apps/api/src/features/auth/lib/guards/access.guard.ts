import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('인증이 실패하였습니다.');
    }

    return user;
  }
}
