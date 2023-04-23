import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { ACCESS_TOKEN } from '../constants/cookie';

@Injectable()
export class AlreadyLoggedIn implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.[ACCESS_TOKEN];

    if (token) {
      throw new BadRequestException('이미 토큰 정보가 존재합니다.');
    }

    /* Todo: cookie 토큰 정보 삭제하기 */

    return true;
  }
}
