import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';
import User from 'src/entities/User.entity';
import Token from 'src/entities/Token.entity';
import { SignupDTO, LoginDTO } from './lib/dtos';
import { JwtUtil } from './lib/utils';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/configs/env.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: EntityRepository<Token>,
    private readonly configService: ConfigService<EnvConfig, true>,
    private readonly jwtUtil: JwtUtil,
  ) {}

  async signup(signupDTO: SignupDTO) {
    const { username, password, email } = signupDTO;
    const hashedPassword = await argon2.hash(password);

    const foundUser = await this.userRepository.findOne({
      $or: [{ username }, { email }],
    });

    if (foundUser) {
      throw new ConflictException(
        '해당 아이디 혹은 이메일을 가진 사용자가 이미 존재합니다.',
      );
    }

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      profile: {
        nickname: username,
        bio: `${username}입니다.`,
      },
    });

    const { accessToken, refreshToken } = await this.jwtUtil.generateTokens(
      user.id,
      user.username,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const token = this.tokenRepository.create({
      refreshToken: hashedRefreshToken,
      user,
    });
    await this.tokenRepository.flush();

    return { accessToken, refreshToken, tokenId: token.id };
  }

  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('잘못된 아이디입니다.');
    }

    const match = await argon2.verify(user.password, password);

    if (!match) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }

    const { accessToken, refreshToken } = await this.jwtUtil.generateTokens(
      user.id,
      user.username,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const token = this.tokenRepository.create({
      refreshToken: hashedRefreshToken,
      user,
    });
    await this.tokenRepository.flush();

    return { accessToken, refreshToken, tokenId: token.id };
  }

  async logout(tokenId: number) {
    const token = this.tokenRepository.getReference(tokenId);
    await this.tokenRepository.removeAndFlush(token);
  }

  async refresh(tokenId: number, refreshToken: string, tokenIssuedAt: Date) {
    const token = await this.tokenRepository.findOne(
      { id: tokenId },
      { populate: ['user'] },
    );

    if (!token) {
      throw new UnauthorizedException('인증 토큰을 찾을 수 없습니다.');
    }

    const match = await argon2.verify(token.refreshToken, refreshToken);

    if (!match) {
      // leaway
      if (dayjs().diff(tokenIssuedAt, 'seconds') < 60) {
        return await this.rotateRefreshToken(token);
      }

      // block
      await this.tokenRepository
        .qb()
        .delete()
        .where({
          user: {
            id: token.user.id,
          },
        });
      await this.tokenRepository.flush();

      throw new ForbiddenException(
        '비정상적인 인증 토큰 갱신 요청으로 강제 로그아웃 됩니다.',
      );
    }

    return await this.rotateRefreshToken(token);
  }

  setAuthCookies(res: Response, data: SetAuthCookiesData) {
    const { accessToken, refreshToken, tokenId } = data;
    const { accessMaxAge, refreshMaxAge } = this.jwtUtil.getTokensMaxAge();

    res.cookie('token_id', tokenId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure:
        this.configService.get('base.env', { infer: true }) === 'production',
      maxAge: refreshMaxAge,
    });

    res.cookie('access_token', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure:
        this.configService.get('base.env', { infer: true }) === 'production',
      maxAge: accessMaxAge,
    });

    res.cookie('refresh_token', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure:
        this.configService.get('base.env', { infer: true }) === 'production',
      maxAge: refreshMaxAge,
    });
  }

  deleteAuthCookies(res: Response) {
    res.cookie('token_id', '', { path: '/', maxAge: 0 });
    res.cookie('access_token', '', { path: '/', maxAge: 0 });
    res.cookie('refresh_token', '', { path: '/', maxAge: 0 });
  }

  private async rotateRefreshToken(token: Token) {
    const { accessToken, refreshToken } = await this.jwtUtil.generateTokens(
      token.user.id,
      token.user.username,
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const updatedToken = this.tokenRepository.assign(token, {
      refreshToken: hashedRefreshToken,
    });

    await this.tokenRepository.flush();

    return { accessToken, refreshToken, tokenId: updatedToken.id };
  }
}

interface SetAuthCookiesData {
  tokenId: number;
  accessToken: string;
  refreshToken: string;
}
