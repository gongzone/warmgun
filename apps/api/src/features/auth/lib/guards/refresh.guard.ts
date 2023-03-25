import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_STRATEGY_NAME } from '../constants';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard(REFRESH_STRATEGY_NAME) {
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('인증이 실패하였습니다.');
    }

    return user;
  }
}
