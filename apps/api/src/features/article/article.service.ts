import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { CreateArticleDTO } from './lib/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async getArticleBySlug(username: string, slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: {
        slug: `/${username}/${slug}`,
      },
      select: {
        id: true,
        title: true,
        subTitle: true,
        body: true,
        coverImage: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            profile: {
              select: {
                nickname: true,
                bio: true,
                avatar: true,
              },
            },
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    const enhancedArticle = {
      id: article.id,
      title: article.title,
      subTitle: article.subTitle,
      body: article.body,
      coverImage: article.coverImage,
      slug: article.slug,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      tags: article.tags,
      likeCount: article._count.likes,
      commentCount: article._count.comments,
    };

    const enhancedAuthor = {
      nickname: article.author.profile.nickname,
      bio: article.author.profile.bio,
      body: article.author.profile.avatar,
    };

    return { article: enhancedArticle, author: enhancedAuthor };
  }

  async getArticlesByPagination(
    username: string,
    take: number,
    cursor?: number,
  ) {
    const articles = await this.prismaService.article.findMany({
      take,
      skip: cursor ? 1 : 0,
      ...(cursor ? { cursor: { id: cursor } } : {}),
      where: {
        author: {
          username,
        },
      },
      select: {
        id: true,
        title: true,
        subTitle: true,
        coverImage: true,
        slug: true,
        createdAt: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!articles) {
      return {
        articles: [],
        lastCursor: 0,
      };
    }

    return {
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        subTitle: article.subTitle,
        coverImage: article.coverImage,
        slug: article.slug,
        createdAt: article.createdAt,
        likeCount: article._count.likes,
        commentCount: article._count.comments,
      })),
      lastCursor: articles[articles.length - 1].id,
    };
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
}
