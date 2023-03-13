import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import Token from 'src/entity/Token.entity';
import { RequestWithUser } from 'src/lib/types/request-with-user';
import { JwtPayload } from '../types/jwt';
import { EnvConfig } from 'src/config/env.config';

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

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<RequestWithUser['user']> {
    const tokenId = parseInt(req.cookies?.['token_id']);
    const refreshToken =
      req.cookies?.['refresh_token'] ??
      req.header('Authorization').split(' ')[1];

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
