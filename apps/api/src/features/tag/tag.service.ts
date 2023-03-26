import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPopularTags(take: number) {
    const popularTags = await this.findPopularTagsQuery(take);

    if (popularTags.length < take) {
      const tagNames = popularTags.map((tag) => tag.name);

      const fallbackTags = await this.findFallbackTagsQuery(
        take - popularTags.length,
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

  private async findPopularTagsQuery(take: number) {
    return await this.prismaService.tag.findMany({
      take,
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

  private async findFallbackTagsQuery(take: number, excludes: string[]) {
    return await this.prismaService.tag.findMany({
      take,
      where: {
        name: {
          notIn: excludes,
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
}
