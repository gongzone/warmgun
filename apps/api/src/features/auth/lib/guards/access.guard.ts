import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACCESS_STRATEGY_NAME } from '../constants';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard(ACCESS_STRATEGY_NAME) {
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('인증이 실패하였습니다.');
    }

    return user;
  }
}
