import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtRefreshGuard from './lib/guards/refresh.guard';
import { SignupDTO, LoginDTO } from './lib/dtos';
import { JwtAccessAuthGuard } from './lib/guards/access.guard';
import { RequestUser } from 'src/lib/types/request-user';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { CookieService } from './cookie.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() signupDTO: SignupDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokenId, accessToken, refreshToken } =
      await this.authService.signup(signupDTO);

    this.cookieService.setAuthCookies(res, {
      tokenId,
      accessToken,
      refreshToken,
    });

    return { tokenId, accessToken, refreshToken };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokenId, accessToken, refreshToken } = await this.authService.login(
      loginDTO,
    );

    this.cookieService.setAuthCookies(res, {
      tokenId,
      accessToken,
      refreshToken,
    });

    return { tokenId, accessToken, refreshToken };
  }

  @UseGuards(JwtAccessAuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetUser() user: RequestUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.id);

    this.cookieService.deleteAuthCookies(res);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetUser() user: RequestUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokenId, accessToken, refreshToken } =
      await this.authService.refresh(
        user.token.id,
        user.token.value,
        user.token.iat,
      );

    this.cookieService.setAuthCookies(res, {
      tokenId,
      accessToken,
      refreshToken,
    });

    return { tokenId, accessToken, refreshToken };
  }
}
