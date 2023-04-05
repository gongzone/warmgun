import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';
import { CreateArticleDTO } from './lib/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

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

    if (!articles || articles.length === 0) {
      return {
        articles: [],
        nextCursor: undefined,
      };
    }

    return {
      articles,
      nextCursor: cursor + 1,
    };
  }

  async getBlogerArticles(username: string, take: number, cursor: number) {
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

    if (!articles) {
      return {
        articles: [],
        nextCursor: undefined,
      };
    }

    return {
      articles,
      nextCursor: cursor + 1,
    };
  }

  async searchArticles(take: number, cursor: number, searchInput: string) {
    const articles = await this.prismaService.article.findMany({
      take,
      where: {
        title: {
          contains: searchInput,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        subTitle: true,
        coverImage: true,
        slug: true,
        createdAt: true,
        tags: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            username: true,
            profile: {
              select: {
                nickname: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!articles || articles.length === 0) {
      return {
        articles: [],
        lastCursor: undefined,
      };
    }

    return {
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        subTitle: article.subTitle,
        coverImage: article.coverImage,
        slug: article.slug,
        tags: article.tags,
        author: {
          username: article.author.username,
          nickname: article.author.profile.nickname,
          avatar: article.author.profile.avatar,
        },
        createdAt: article.createdAt,
        likeCount: article._count.likes,
        commentCount: article._count.comments,
      })),
      nextCursor: cursor + 1,
    };
  }

  async getArticleBySlug(username: string, slug: string) {
    console.log(username, slug);

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
