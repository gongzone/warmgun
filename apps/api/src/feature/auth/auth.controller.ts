import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtRefreshGuard from './lib/guards/refresh.guard';
import { SignupDTO, LoginDTO } from './lib/dtos';
import { JwtAccessAuthGuard } from './lib/guards/access.guard';
import { RequestWithUser } from 'src/lib/types/request-with-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() signupDTO: SignupDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, tokenId } =
      await this.authService.signup(signupDTO);
    this.authService.setAuthCookies(res, {
      tokenId,
      accessToken,
      refreshToken,
    });

    return { accessToken, refreshToken, tokenId };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, tokenId } = await this.authService.login(
      loginDTO,
    );
    this.authService.setAuthCookies(res, {
      tokenId,
      accessToken,
      refreshToken,
    });

    return { accessToken, refreshToken, tokenId };
  }

  @UseGuards(JwtAccessAuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id } = req.user.token;
    await this.authService.logout(id);
    this.authService.deleteAuthCookies(res);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, value, iat } = req.user.token;
    const { accessToken, refreshToken, tokenId } =
      await this.authService.refresh(id, value, iat);
    this.authService.setAuthCookies(res, {
      tokenId,
      accessToken,
      refreshToken,
    });

    return { accessToken, refreshToken, tokenId };
  }
}
