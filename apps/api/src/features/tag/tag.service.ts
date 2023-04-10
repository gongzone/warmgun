import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { TagFindAllMode } from './types';

const POPULAR_TAGS_NUMBER = 12;

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ mode }: { mode: TagFindAllMode }) {
    if (mode === 'popular') {
      return this.findPopularTags();
    }
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

  private async findPopularTags() {
    const popularTags = await this.prismaService.tag.findMany({
      take: POPULAR_TAGS_NUMBER,
      where: {
        articles: {
          some: {
            createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
          },
        },
      },
      orderBy: { articles: { _count: 'desc' } },
    });

    if (popularTags.length < POPULAR_TAGS_NUMBER) {
      const excludes = popularTags.map((tag) => tag.name);

      const fallbackTags = await this.prismaService.tag.findMany({
        take: POPULAR_TAGS_NUMBER - popularTags.length,
        where: {
          name: { notIn: excludes },
        },
        orderBy: { articles: { _count: 'desc' } },
      });

      return popularTags.concat(fallbackTags);
    }

    return popularTags;
  }
}
