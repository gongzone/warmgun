import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/env.config';
import { ORMModule } from './feature/@base/orm/orm.module';
import { AuthModule } from './feature/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [envConfig],
      isGlobal: true,
      cache: true,
    }),
    ORMModule,
    AuthModule,
  ],
})
export class AppModule {}
