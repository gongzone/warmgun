import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './configs/env.config';
import { ORMModule } from './features/@base/orm/orm.module';
import { AuthModule } from './features/auth/auth.module';
import { MeModule } from './features/me/me.module';

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
    MeModule,
  ],
})
export class AppModule {}
