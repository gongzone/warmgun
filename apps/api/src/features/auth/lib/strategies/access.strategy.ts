import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { RequestWithUser } from 'src/lib/types/request-with-user';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt';
import { EnvConfig } from 'src/configs/env.config';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    protected readonly configService: ConfigService<EnvConfig, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.['access_token'],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.accessSecretKey', { infer: true }),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<RequestWithUser['user']> {
    const tokenId = parseInt(req.cookies?.['token_id']);
    const accessToken =
      req.cookies?.['access_token'] ??
      req.header('Authorization').split(' ')[1];

    if (!tokenId || !accessToken) {
      throw new UnauthorizedException('인증 토큰을 찾을 수 없습니다.');
    }

    return {
      id: payload.sub,
      username: payload.username,
      token: {
        id: tokenId,
        value: accessToken,
        iat: new Date(payload.iat * 1000),
        exp: new Date(payload.exp * 1000),
      },
    };
  }
}