import {
  CanActivate,
  ExecutionContext,
  Inject,
  Type,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_ID } from '../constants/cookie';
import { RequestUser } from '../types/request-user';
import { JwtPayload } from '../types/token';

type AuthGuardMode = 'access' | 'refresh';

export const AuthGuard = (
  mode: AuthGuardMode = 'access',
): Type<CanActivate> => {
  class AuthGuardMixin implements CanActivate {
    constructor(
      @Inject(JwtService) private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const tokenId = parseInt(req.cookies?.[TOKEN_ID]);
      const token: string =
        mode === 'access'
          ? req.cookies?.[ACCESS_TOKEN]
          : req.cookies?.[REFRESH_TOKEN];

      if (!token) {
        throw new UnauthorizedException('인증 토큰을 찾을 수 없습니다.');
      }

      try {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
          secret:
            mode === 'access'
              ? this.configService.get('JWT_ACCESS_KEY')
              : this.configService.get('JWT_REFRESH_KEY'),
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
      } catch (err) {
        throw new UnauthorizedException(
          '토큰 검증 과정에서 문제가 발생하였습니다.',
        );
      }

      return true;
    }
  }

  return mixin(AuthGuardMixin);
};
