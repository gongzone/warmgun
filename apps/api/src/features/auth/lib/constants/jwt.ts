interface TokenConfig {
  secret: 'JWT_ACCESS_KEY' | 'JWT_REFRESH_KEY';
  expiresIn: string | number;
}

export const ACCESS_STRATEGY_NAME = 'jwt-access';
export const REFRESH_STRATEGY_NAME = 'jwt-refresh';

export const TOKENS_CONFIGS = {
  access: {
    secret: 'JWT_ACCESS_KEY',
    expiresIn: 5, // 30m
  } satisfies TokenConfig,
  refresh: {
    secret: 'JWT_REFRESH_KEY',
    expiresIn: 60 * 60 * 24 * 7, // 7d
  } satisfies TokenConfig,
};
