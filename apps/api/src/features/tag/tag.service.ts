import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

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
