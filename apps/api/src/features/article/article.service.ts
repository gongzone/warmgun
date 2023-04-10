import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { ArticleFindAllMode } from './types';

const ARTICLES_PAGINATION_TAKE = 12;

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    mode,
    cursor,
  }: {
    mode: ArticleFindAllMode;
    cursor: number;
  }) {
    if (mode === 'best') {
      return await this.findBestArtlces();
    }

    if (mode === 'hot') {
      return await this.findHotArticles(cursor);
    }
  }

  async findOne(userId: number, slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: { slug },
      include: {
        ...this.articleInclude,
        likes: userId ? { where: { userId } } : false,
      },
    });

    if (!article) {
      throw new BadRequestException('아티클을 찾을 수 없습니다.');
    }

    return { ...article, isLiked: !!article.likes?.length };
  }

  async findBlogerArticles(username: string, cursor: number) {
    const articles = await this.prismaService.article.findMany({
      take: ARTICLES_PAGINATION_TAKE,
      skip: ARTICLES_PAGINATION_TAKE * cursor,
      where: {
        author: { username },
      },
      include: this.articleInclude,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      articles,
      nextCursor:
        articles.length === ARTICLES_PAGINATION_TAKE ? cursor + 1 : undefined,
    };
  }

  async create(userId: number, createArticleDto: CreateArticleDto) {
    const { title, subTitle, body, coverImage, slug, tags } = createArticleDto;

    await this.prismaService.article.create({
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
          connect: { id: userId },
        },
      },
    });
  }

  async like(userId: number, articleId: number) {
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
          connect: { id: userId },
        },
        article: {
          connect: { id: articleId },
        },
      },
    });

    /* Todo: trending score update */
  }

  async unlike(userId: number, articleId: number) {
    await this.prismaService.like.deleteMany({
      where: {
        AND: [{ userId }, { articleId }],
      },
    });

    /* Todo: trending score update */
  }

  private async findBestArtlces() {
    const articles = await this.prismaService.article.findMany({
      take: ARTICLES_PAGINATION_TAKE,
      include: this.articleInclude,
      orderBy: {
        trendingScore: 'desc',
      },
    });

    return articles;
  }

  private async findHotArticles(cursor: number) {
    const articles = await this.prismaService.article.findMany({
      take: ARTICLES_PAGINATION_TAKE,
      skip: ARTICLES_PAGINATION_TAKE * cursor,
      include: this.articleInclude,
      orderBy: {
        trendingScore: 'desc',
      },
    });

    return {
      articles,
      nextCursor:
        articles.length === ARTICLES_PAGINATION_TAKE ? cursor + 1 : undefined,
    };
  }

  private get articleInclude() {
    return {
      tags: true,
      author: {
        include: { profile: true },
      },
      _count: {
        select: { likes: true, comments: true },
      },
    } satisfies Prisma.ArticleInclude;
  }
}
