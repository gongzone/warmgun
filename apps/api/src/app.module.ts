import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './features/auth/auth.module';
import { MeModule } from './features/me/me.module';
import { DraftModule } from './features/draft/draft.module';
import { ImageModule } from './features/@base/image/image.module';
import { TagModule } from './features/tag/tag.module';
import { PrismaModule } from './features/@base/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    PrismaModule,
    AuthModule,
    MeModule,
    DraftModule,
    ImageModule,
    TagModule,
  ],
})
export class AppModule {}
