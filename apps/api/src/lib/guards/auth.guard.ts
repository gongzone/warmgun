import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_ID } from '../constants/cookie';
import { RequestUser } from '../types/request-user';
import { JwtPayload } from '../types/token';
import { AuthService } from 'src/features/auth/auth.service';
import { CookieService } from 'src/features/auth/cookie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authSerivce: AuthService,
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const tokenId = parseInt(req.cookies?.[TOKEN_ID]);
    const accessToken = req.cookies?.[ACCESS_TOKEN];
    const refreshToken = req.cookies?.[REFRESH_TOKEN];

    if (!tokenId || !refreshToken) {
      throw new UnauthorizedException('인증 토큰을 찾을 수 없습니다.');
    }

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

      return true;
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
    } catch (err) {
      throw new UnauthorizedException(
        '토큰 검증 과정에서 문제가 발생하였습니다.',
      );
    }

    return true;
  }
}
