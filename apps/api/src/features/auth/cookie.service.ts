import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import {
  TOKEN_ID,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from 'src/lib/constants/cookie';
import { TOKENS_CONFIGS } from 'src/lib/constants/token';

interface SetAuthCookiesData {
  tokenId: number;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class CookieService {
  setAuthCookies(res: Response, data: SetAuthCookiesData) {
    const { tokenId, accessToken, refreshToken } = data;

    const accessMaxAge = TOKENS_CONFIGS['access'].expiresIn * 1000;
    const refreshMaxAge = TOKENS_CONFIGS['refresh'].expiresIn * 1000;

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
