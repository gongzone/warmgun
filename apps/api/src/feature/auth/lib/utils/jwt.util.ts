import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenConfig } from '../types';
import { ConfigServiceWithEnv } from 'src/lib/types/config-service-with-env';

const TOKENS_OPTIONS = {
  access: {
    secret: 'jwt.accessSecretKey',
    expiresIn: '30m',
  } satisfies TokenConfig,
  refresh: {
    secret: 'jwt.refreshSecretKey',
    expiresIn: '7d',
  } satisfies TokenConfig,
};

@Injectable()
export class JwtUtil {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigServiceWithEnv,
  ) {}

  async generateTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(userId, username, 'access'),
      this.generateToken(userId, username, 'refresh'),
    ]);

    return { accessToken, refreshToken };
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  private async generateToken(
    userId: number,
    username: string,
    token: 'access' | 'refresh',
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        username,
      } satisfies JwtPayload,
      {
        secret: this.configService.get(TOKENS_OPTIONS[token].secret, {
          infer: true,
        }),
        expiresIn: TOKENS_OPTIONS[token].expiresIn,
      },
    );
  }
}
