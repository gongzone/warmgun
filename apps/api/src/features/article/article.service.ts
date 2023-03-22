import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { CreateArticleDTO } from './lib/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async createArticle(userId: number, createArticleDTO: CreateArticleDTO) {
    const { title, subTitle, body, coverImage, slug, tags } = createArticleDTO;

    const article = await this.prismaService.article.create({
      data: {
        title,
        subTitle,
        body,
        coverImage,
        slug,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return article;
  }
}
