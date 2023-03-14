export interface EnvConfig {
  base: {
    env: string;
  };
  database: {
    dbName: string;
    user: string;
    password: string;
    host: string;
    port: number;
  };
  jwt: {
    accessSecretKey: string;
    refreshSecretKey: string;
  };
}

export default () =>
  ({
    base: {
      env: process.env.NODE_ENV,
    },
    database: {
      dbName: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
    },
    jwt: {
      accessSecretKey: process.env.JWT_ACCESS_KEY,
      refreshSecretKey: process.env.JWT_REFRESH_KEY,
    },
  } satisfies EnvConfig);
