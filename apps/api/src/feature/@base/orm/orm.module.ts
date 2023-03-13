import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoadStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/config/env.config';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig, true>) => ({
        type: 'postgresql',
        dbName: configService.get('database.dbName', { infer: true }),
        user: configService.get('database.user', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        host: configService.get('database.host', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        autoLoadEntities: true,
        debug: configService.get('base.env', { infer: true }) !== 'production',
        logger: logger.log.bind(logger),
        loadStrategy: LoadStrategy.JOINED,
      }),
    }),
  ],
})
export class ORMModule {}
