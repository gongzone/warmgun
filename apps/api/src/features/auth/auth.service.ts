import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';
import { SignupDTO, LoginDTO } from './lib/dtos';
import { PrismaService } from '../@base/prisma/prisma.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDTO: SignupDTO) {
    const { username, password, email } = signupDTO;
    const hashedPassword = await argon2.hash(password);

    const foundUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
      select: { id: true },
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
          create: { nickname: username, bio: `안녕하세요. ${username}입니다.` },
        },
        drafts: {
          create: {},
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    const { accessToken, refreshToken } = await this.jwtService.generateTokens(
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
      select: { id: true },
    });

    return { tokenId: token.id, accessToken, refreshToken };
  }

  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;

    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('잘못된 아이디입니다.');
    }

    const match = await argon2.verify(user.password, password);

    if (!match) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }

    const { accessToken, refreshToken } = await this.jwtService.generateTokens(
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
      select: { id: true },
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

  async refresh(tokenId: number, refreshToken: string, tokenIssuedAt: Date) {
    const token = await this.prismaService.token.findUnique({
      where: {
        id: tokenId,
      },
      select: {
        id: true,
        refreshToken: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!token) {
      throw new UnauthorizedException('인증 토큰을 찾을 수 없습니다.');
    }

    const match = await argon2.verify(token.refreshToken, refreshToken);

    if (!match) {
      // leaway
      if (dayjs().diff(tokenIssuedAt, 'seconds') < 60) {
        return await this.rotateRefreshToken(
          token.id,
          token.user.id,
          token.user.username,
        );
      }

      // block
      await this.prismaService.token.deleteMany({
        where: {
          userId: token.user.id,
        },
      });

      throw new ForbiddenException(
        '비정상적인 인증 토큰 갱신 요청으로 강제 로그아웃 됩니다.',
      );
    }

    return await this.rotateRefreshToken(
      token.id,
      token.user.id,
      token.user.username,
    );
  }

  private async rotateRefreshToken(
    tokenId: number,
    userId: number,
    username: string,
  ) {
    const { accessToken, refreshToken } = await this.jwtService.generateTokens(
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
      select: {
        id: true,
      },
    });

    return { tokenId: updatedToken.id, accessToken, refreshToken };
  }
}
