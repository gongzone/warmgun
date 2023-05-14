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
import { Request, Response } from 'express';

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

    const tokenId = req.cookies?.[TOKEN_ID];
    const accessToken = req.cookies?.[ACCESS_TOKEN];
    const refreshToken = req.cookies?.[REFRESH_TOKEN];

    if (!tokenId || !refreshToken) {
      req['user'] = null;
      return next.handle();
    }

    if (!accessToken && refreshToken) {
      await this.refreshFlow(req, res, tokenId, refreshToken);
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
      await this.refreshFlow(req, res, tokenId, refreshToken);
      return next.handle();
    }

    return next.handle();
  }

  private async refreshFlow(
    req: Request,
    res: Response,
    tokenId: string,
    refreshToken: string,
  ) {
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
  }
}
