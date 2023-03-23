import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';

const TOTAL_TAGS_NUMBER = 12;

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async findPopularTagsQuery(total: number) {
    return await this.prismaService.tag.findMany({
      take: total,
      where: {
        articles: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // two weeks
            },
          },
        },
      },
      orderBy: {
        articles: {
          _count: 'desc',
        },
      },
      select: {
        name: true,
      },
    });
  }

  async findFallbackTagsQuery(
    total: number,
    skip: number,
    existingTagNames: string[],
  ) {
    const take = total - skip;

    return await this.prismaService.tag.findMany({
      skip,
      take,
      where: {
        name: {
          notIn: existingTagNames,
        },
      },
      orderBy: {
        articles: {
          _count: 'desc',
        },
      },
      select: {
        name: true,
      },
    });
  }

  async getPopularTags() {
    const popularTags = await this.findPopularTagsQuery(TOTAL_TAGS_NUMBER);

    if (popularTags.length < TOTAL_TAGS_NUMBER) {
      const tagNames = popularTags.map((tag) => tag.name);

      const fallbackTags = await this.findFallbackTagsQuery(
        TOTAL_TAGS_NUMBER,
        popularTags.length,
        tagNames,
      );

      return popularTags.concat(fallbackTags);
    }

    return popularTags;
  }

  async searchTags(input: string, excludes: string[] = []) {
    // startsWith를 fullText를 바꿀지 고민

    const fetchedTags = await this.prismaService.tag.findMany({
      where: {
        name: {
          startsWith: input,
          notIn: excludes,
          mode: 'insensitive',
        },
      },
      take: 5,
      orderBy: {
        articles: {
          _count: 'asc',
        },
      },
      select: {
        name: true,
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });

    return fetchedTags.map((tag) => ({
      name: tag.name,
      count: tag._count.articles,
    }));
  }
}
