import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';
import { CreateArticleDTO } from './lib/create-article.dto';
import { PaginationData } from 'src/lib/types/pagination';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchArticles(search: string, paginationData: PaginationData) {
    const { take, cursor } = paginationData;

    /* MoreValue: Filtering */
    const articles = await this.prismaService.article.findMany({
      take,
      skip: take * cursor,
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: this.populateArticleInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      articles,
      nextCursor: articles.length === take ? cursor + 1 : undefined,
    };
  }

  async getBestArticles(take: number) {
    const articles = await this.prismaService.article.findMany({
      take,
      include: this.populateArticleInclude(),
      orderBy: {
        trendingScore: 'desc',
      },
    });

    return articles;
  }

  async getHotArticles(take: number, cursor: number) {
    const articles = await this.prismaService.article.findMany({
      take,
      skip: take * cursor,
      include: this.populateArticleInclude(),
      orderBy: {
        trendingScore: 'desc',
      },
    });

    return {
      articles,
      nextCursor: articles.length === take ? cursor + 1 : undefined,
    };
  }

  async getBlogerArticles(username: string, paginationData: PaginationData) {
    const { take, cursor } = paginationData;

    /* MoreValue: Filtering */
    const articles = await this.prismaService.article.findMany({
      take,
      skip: take * cursor,
      where: {
        author: {
          username,
        },
      },
      include: this.populateArticleInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      articles,
      nextCursor: articles.length === take ? cursor + 1 : undefined,
    };
  }

  async getBlogerArticle(username: string, slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: {
        slug: `/@${username}/${slug}`,
      },
      include: this.populateArticleInclude(),
    });

    if (!article) {
      throw new BadRequestException('아티클을 찾을 수 없습니다.');
    }

    return article;
  }

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

  private populateArticleInclude() {
    return {
      tags: true,
      author: {
        include: {
          profile: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    } satisfies Prisma.ArticleInclude;
  }
}
