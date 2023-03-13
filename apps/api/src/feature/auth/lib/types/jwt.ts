export interface JwtPayload {
  sub: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface TokenConfig {
  secret: 'jwt.accessSecretKey' | 'jwt.refreshSecretKey';
  expiresIn: string | number;
}
