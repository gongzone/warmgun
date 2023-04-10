import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './features/@base/prisma/prisma.module';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
// import { MeModule } from './features/me/me.module';
// import { DraftModule } from './features/draft/draft.module';
// import { ImageModule } from './features/@base/image/image.module';
// import { TagModule } from './features/tag/tag.module';
// import { ArticleModule } from './features/article/article.module';
// import { LikeModule } from './features/like/like.module';
// import { CommentModule } from './features/comment/comment.module';
// import { MeilisearchModule } from './features/@base/meilisearch/meilisearch.module';
// import { SearchModule } from './features/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    // MeModule,
    // DraftModule,
    // ImageModule,
    // TagModule,
    // ArticleModule,

    // LikeModule,
    // CommentModule,
    // MeilisearchModule,
    // SearchModule,
  ],
})
export class AppModule {}
