import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { TOKEN_ID, ACCESS_TOKEN, REFRESH_TOKEN } from './lib/constants';
import { JwtService } from './jwt.service';

interface SetAuthCookiesData {
  tokenId: number;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class CookieService {
  constructor(private readonly jwtService: JwtService) {}

  setAuthCookies(res: Response, data: SetAuthCookiesData) {
    const { accessToken, refreshToken, tokenId } = data;
    const { accessMaxAge, refreshMaxAge } = this.jwtService.getTokensMaxAge();

    res.cookie(TOKEN_ID, tokenId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: refreshMaxAge,
    });

    res.cookie(ACCESS_TOKEN, accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: accessMaxAge,
    });

    res.cookie(REFRESH_TOKEN, refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: refreshMaxAge,
    });
  }

  deleteAuthCookies(res: Response) {
    res.cookie(TOKEN_ID, '', { path: '/', maxAge: 0 });
    res.cookie(ACCESS_TOKEN, '', { path: '/', maxAge: 0 });
    res.cookie(REFRESH_TOKEN, '', { path: '/', maxAge: 0 });
  }
}
