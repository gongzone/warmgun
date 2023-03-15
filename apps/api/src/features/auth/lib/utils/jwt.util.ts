import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvConfig } from 'src/configs/env.config';
import { JwtPayload, TokenConfig } from '../types';

const TOKENS_OPTIONS = {
  access: {
    secret: 'jwt.accessSecretKey',
    expiresIn: 5,
  } satisfies TokenConfig,
  refresh: {
    secret: 'jwt.refreshSecretKey',
    expiresIn: 60 * 60 * 24 * 7,
  } satisfies TokenConfig,
};

@Injectable()
export class JwtUtil {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvConfig, true>,
  ) {}

  async generateTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(userId, username, 'access'),
      this.generateToken(userId, username, 'refresh'),
    ]);

    return { accessToken, refreshToken };
  }

  getTokensMaxAge() {
    const accessMaxAge = TOKENS_OPTIONS['access'].expiresIn * 1000;
    const refreshMaxAge = TOKENS_OPTIONS['refresh'].expiresIn * 1000;
    return { accessMaxAge, refreshMaxAge };
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
