import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_ID } from '../constants/cookie';
import { JwtPayload } from '../types/token';
import { RequestUser } from '../types/request-user';
import { AuthService } from 'src/features/auth/auth.service';
import { CookieService } from 'src/features/auth/cookie.service';

@Injectable()
export class ReqUserInterceptor implements NestInterceptor {
  constructor(
    private readonly authSerivce: AuthService,
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const tokenId = parseInt(req.cookies?.[TOKEN_ID]);
    const accessToken = req.cookies?.[ACCESS_TOKEN];
    const refreshToken = req.cookies?.[REFRESH_TOKEN];

    if (!tokenId || !refreshToken) {
      req['user'] = null;
      return next.handle();
    }

    // 리프레시가 필요한 경우
    if (!accessToken && refreshToken) {
      const {
        tokenId: newTokenId,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        userId,
        username,
      } = await this.authSerivce.refresh(tokenId, refreshToken);

      this.cookieService.setAuthCookies(res, {
        tokenId: newTokenId,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      req['user'] = {
        id: userId,
        username,
      };

      return next.handle();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        accessToken,
        {
          secret: this.configService.get('JWT_ACCESS_KEY'),
        },
      );

      req['user'] = {
        id: payload.sub,
        username: payload.username,
      } satisfies RequestUser;
    } catch {
      req['user'] = null;
      return next.handle();
    }

    return next.handle();
  }
}
