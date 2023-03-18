import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { RequestUser } from 'src/lib/types/request-user';
import { JwtPayload } from '../types/jwt';
import { EnvConfig } from 'src/configs/env.config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    protected readonly configService: ConfigService<EnvConfig, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.['refresh_token'],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refreshSecretKey', { infer: true }),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<RequestUser> {
    const tokenId = parseInt(req.cookies?.['token_id']);
    const refreshToken =
      req.cookies?.['refresh_token'] ??
      req.header('Authorization').split(' ')[1];

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
