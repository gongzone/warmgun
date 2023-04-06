import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACCESS_STRATEGY_NAME } from '../constants';

@Injectable()
export class JwtCheckGuard extends AuthGuard(ACCESS_STRATEGY_NAME) {
  handleRequest(err, user) {
    if (err || !user) {
      return null;
    }

    return user;
  }
}
