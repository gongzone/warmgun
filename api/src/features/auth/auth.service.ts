import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';

import { SignupDto, LoginDto } from './dtos';
import { PrismaService } from '../@base/prisma/prisma.service';
import { JwtPayload } from 'src/lib/types/token';
import { TOKENS_CONFIGS } from 'src/lib/constants/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDTO: SignupDto) {
    const { username, password, email } = signupDTO;
    const hashedPassword = await argon2.hash(password);

    const foundUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (foundUser) {
      throw new ConflictException(
        '해당 아이디 혹은 이메일을 가진 사용자가 이미 존재합니다.',
      );
    }

    const user = await this.prismaService.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        profile: {
          create: {
            nickname: username,
            field: '블로거',
            bio: `반갑습니다. ${username}입니다.`,
          },
        },
        drafts: {
          create: {},
        },
      },
    });

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.username,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const token = await this.prismaService.token.create({
      data: {
        refreshToken: hashedRefreshToken,
        user: { connect: { id: user.id } },
      },
    });

    /* Todo: meilisearch Add Index */

    return { tokenId: token.id, accessToken, refreshToken };
  }

  async login(loginDTO: LoginDto) {
    const { username, password } = loginDTO;

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException('잘못된 아이디입니다.');
    }

    const match = await argon2.verify(user.password, password);
    if (!match) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.username,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const token = await this.prismaService.token.create({
      data: {
        refreshToken: hashedRefreshToken,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return { tokenId: token.id, accessToken, refreshToken };
  }

  async logout(userId: number) {
    await this.prismaService.token.deleteMany({
      where: {
        userId,
      },
    });
  }

  async refresh(tokenId: string, refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_KEY'),
      });
    } catch {
      throw new UnauthorizedException(
        '리프레시 토큰 검증 과정에서 문제가 발생하였습니다.',
      );
    }

    const token = await this.prismaService.token.findUnique({
      where: {
        id_userId: { id: tokenId, userId: payload.sub },
      },
    });

    if (!token) {
      throw new UnauthorizedException('인증 토큰을 찾을 수 없습니다.');
    }

    const match = await argon2.verify(token.refreshToken, refreshToken);

    if (!match) {
      // leaway
      if (dayjs().diff(new Date(payload.iat * 1000), 'seconds') < 60) {
        return await this.rotateRefreshToken(
          token.id,
          payload.sub,
          payload.username,
        );
      }

      // block
      await this.prismaService.token.deleteMany({
        where: {
          userId: payload.sub,
        },
      });

      throw new ForbiddenException(
        '비정상적인 인증 토큰 갱신 요청으로 강제 로그아웃 됩니다.',
      );
    }

    return await this.rotateRefreshToken(
      token.id,
      payload.sub,
      payload.username,
    );
  }

  private async rotateRefreshToken(
    tokenId: string,
    userId: number,
    username: string,
  ) {
    const { accessToken, refreshToken } = await this.generateTokens(
      userId,
      username,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const updatedToken = await this.prismaService.token.update({
      where: {
        id: tokenId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      tokenId: updatedToken.id,
      accessToken,
      refreshToken,
      userId,
      username,
    };
  }

  private async generateTokens(userId: number, username: string) {
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
