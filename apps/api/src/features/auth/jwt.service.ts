import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JwtPayload } from './lib/types';
import { TOKENS_CONFIGS } from './lib/constants';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  getTokensMaxAge() {
    const accessMaxAge = TOKENS_CONFIGS['access'].expiresIn * 1000;
    const refreshMaxAge = TOKENS_CONFIGS['refresh'].expiresIn * 1000;
    return { accessMaxAge, refreshMaxAge };
  }

  async generateTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(userId, username, 'access'),
      this.generateToken(userId, username, 'refresh'),
    ]);

    return { accessToken, refreshToken };
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
        secret: this.configService.get(TOKENS_CONFIGS[token].secret),
        expiresIn: TOKENS_CONFIGS[token].expiresIn,
      },
    );
  }
}
