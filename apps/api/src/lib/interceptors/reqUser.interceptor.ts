import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ACCESS_TOKEN, TOKEN_ID } from '../constants/cookie';
import { JwtPayload } from '../types/token';
import { RequestUser } from '../types/request-user';

@Injectable()
export class ReqUserInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const tokenId = parseInt(req.cookies?.[TOKEN_ID]);
    const token = req.cookies?.[ACCESS_TOKEN];

    if (!token) {
      req['user'] = null;
      return next.handle();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get('JWT_ACCESS_KEY'),
      });

      req['user'] = {
        id: payload.sub,
        username: payload.username,
        token: {
          id: tokenId,
          value: token,
          iat: new Date(payload.iat * 1000),
          exp: new Date(payload.exp * 1000),
        },
      } satisfies RequestUser;
    } catch {
      req['user'] = null;
      return next.handle();
    }

    return next.handle();
  }
}
