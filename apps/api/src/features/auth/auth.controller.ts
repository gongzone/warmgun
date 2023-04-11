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
import { CookieService } from './cookie.service';
import { SignupDto, LoginDto } from './dtos';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { AlreadyLoggedIn } from 'src/lib/guards/alreadyLoggedIn.guard';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { RequestUser } from 'src/lib/types/request-user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  /* Check */
  @UseGuards(AlreadyLoggedIn)
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() signupDTO: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokenId, accessToken, refreshToken } =
      await this.authService.signup(signupDTO);

    this.cookieService.setAuthCookies(res, {
      tokenId,
      accessToken,
      refreshToken,
    });

    return { message: '회원가입 성공' };
  }

  /* Check */
  @UseGuards(AlreadyLoggedIn)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDTO: LoginDto,
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

    return { message: '로그인 성공' };
  }

  /* Check */
  @UseGuards(AuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetUser('id') userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);

    this.cookieService.deleteAuthCookies(res);

    return { message: '로그아웃 성공' };
  }

  /* Check */
  // @UseGuards(AuthGuard('refresh'))
  // @Post('/refresh')
  // @HttpCode(HttpStatus.OK)
  // async refresh(
  //   @GetUser() user: RequestUser,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const { tokenId, accessToken, refreshToken } =
  //     await this.authService.refresh(user.token.id, user.token.value);

  //   this.cookieService.setAuthCookies(res, {
  //     tokenId,
  //     accessToken,
  //     refreshToken,
  //   });

  //   return { tokenId, accessToken, refreshToken };
  // }
}
