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

  async getBlogerArticle(
    username: string,
    slug: string,
    requestUserId?: number,
  ) {
    const article = await this.prismaService.article.findUnique({
      where: {
        slug: `/@${username}/${slug}`,
      },
      include: {
        ...this.populateArticleInclude(),
        likes: requestUserId
          ? {
              where: {
                userId: requestUserId,
              },
            }
          : false,
      },
    });

    console.log(article.likes?.length);

    if (!article) {
      throw new BadRequestException('아티클을 찾을 수 없습니다.');
    }

    return { ...article, isLiked: !!article.likes?.length };
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

  async likeArticle(userId: number, articleId: number) {
    const foundLike = await this.prismaService.like.findFirst({
      where: {
        AND: [{ userId }, { articleId }],
      },
    });

    if (foundLike) {
      throw new BadRequestException('이미 좋아요한 아티클입니다.');
    }

    await this.prismaService.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        article: {
          connect: {
            id: articleId,
          },
        },
      },
    });

    /* Todo: trending score update */
  }

  async unlikeArticle(userId: number, articleId: number) {
    await this.prismaService.like.deleteMany({
      where: {
        AND: [{ userId }, { articleId }],
      },
    });

    /* Todo: trending score update */
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
