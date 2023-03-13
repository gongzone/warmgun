import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigServiceWithEnv } from 'src/lib/types/config-service-with-env';
import { RequestWithUser } from 'src/lib/types/request-with-user';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(protected readonly configService: ConfigServiceWithEnv) {
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
