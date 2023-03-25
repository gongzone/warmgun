import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { RequestUser } from 'src/lib/types/request-user';
import { JwtPayload } from '../types/jwt';
import {
  TOKENS_CONFIGS,
  TOKEN_ID,
  REFRESH_TOKEN,
  REFRESH_STRATEGY_NAME,
} from '../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  REFRESH_STRATEGY_NAME,
) {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.[REFRESH_TOKEN],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get(TOKENS_CONFIGS['refresh'].secret),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<RequestUser> {
    const tokenId = parseInt(req.cookies?.[TOKEN_ID]);
    const refreshToken =
      req.cookies?.[REFRESH_TOKEN] ?? req.header('Authorization').split(' ')[1];

    if (!tokenId || !refreshToken) {
      throw new UnauthorizedException('인증 토큰을 찾을 수 없습니다.');
    }

    return {
      id: payload.sub,
      username: payload.username,
      token: {
        id: tokenId,
        value: refreshToken,
        iat: new Date(payload.iat * 1000),
        exp: new Date(payload.exp * 1000),
      },
    };
  }
}
