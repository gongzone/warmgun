import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './features/@base/prisma/prisma.module';
import { S3Module } from './features/@base/s3/s3.module';
import { ImageModule } from './features/image/image.module';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { DraftModule } from './features/draft/draft.module';
import { ArticleModule } from './features/article/article.module';
import { TagModule } from './features/tag/tag.module';
import { CommentModule } from './features/comment/comment.module';
import { MeilisearchModule } from './features/@base/meilisearch/meilisearch.module';
import { SearchModule } from './features/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    PrismaModule,
    MeilisearchModule,
    S3Module,
    ImageModule,
    AuthModule,
    UserModule,
    DraftModule,
    ArticleModule,
    TagModule,
    CommentModule,
    SearchModule,
  ],
})
export class AppModule {}
