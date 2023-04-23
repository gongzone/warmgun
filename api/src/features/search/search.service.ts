import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { MeilisearchService } from '../@base/meilisearch/meilisearch.service';
import { Prisma } from '@prisma/client';
import { buildPaginationData } from 'src/lib/utils/infinitePagination';

@Injectable()
export class SearchService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly meilisearchService: MeilisearchService,
  ) {}

  async searchAll(
    q: string,
    type: 'articles' | 'users' | 'tags',
    take: number,
    cursor: number,
  ) {
    try {
      const searchResult = await this.meilisearchService
        .index(type)
        .search(`${q}?limit=${take}&offset=${cursor * take}`);

      if (type === 'articles') {
        const articles = await this.prismaService.article.findMany({
          where: {
            id: { in: searchResult.hits.map((hit) => hit.id) },
          },
          include: this.articleInclude,
          orderBy: {
            createdAt: 'desc',
          },
        });

        return buildPaginationData(articles, take, cursor);
      }
    } catch {
      return {
        data: [],
        nextCusor: undefined,
      };
    }
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
