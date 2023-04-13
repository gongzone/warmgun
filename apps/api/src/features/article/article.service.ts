import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { buildPaginationData } from 'src/lib/utils/infinitePagination';
import { UpdateArticleDto } from './dtos';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async findBestArticles(take: number) {
    const articles = await this.prismaService.article.findMany({
      take: take,
      include: this.articleInclude,
      orderBy: {
        trendingScore: 'desc',
      },
    });

    return articles;
  }

  async findHotArticles(take: number, cursor: number) {
    const articles = await this.prismaService.article.findMany({
      take: take,
      skip: take * cursor,
      include: this.articleInclude,
      orderBy: {
        trendingScore: 'desc',
      },
    });

    return buildPaginationData(articles, take, cursor);
  }

  async findOnePublished(userId: number, id: number) {
    const article = await this.prismaService.article.findUnique({
      where: {
        id_authorId: {
          id,
          authorId: userId,
        },
      },
      include: this.articleInclude,
    });

    return article;
  }

  async findOne(userId: number | null, username: string, slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: { slug: `/@${username}/${slug}` },
      include: {
        ...this.articleInclude,
        likes: userId ? { where: { userId } } : false,
      },
    });

    if (!article) {
      throw new BadRequestException('아티클을 찾을 수 없습니다.');
    }

    return {
      ...article,
      isLiked: !!article.likes?.length,
      isOwner: article.authorId === userId,
    };
  }

  async findUserArticles(username: string, take: number, cursor: number) {
    const articles = await this.prismaService.article.findMany({
      take: take,
      skip: take * cursor,
      where: {
        author: { username },
      },
      include: this.articleInclude,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return buildPaginationData(articles, take, cursor);
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

  async update(userId: number, id: number, updateArticleDto: UpdateArticleDto) {
    const { title, subTitle, body, coverImage, slug, tags } = updateArticleDto;

    console.log(tags);

    await this.prismaService.article.update({
      where: {
        id_authorId: {
          id,
          authorId: userId,
        },
      },
      data: {
        title,
        subTitle,
        body,
        coverImage,
        slug,
        tags: {
          set: [],
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async delete() {
    return;
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
