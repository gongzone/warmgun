import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTopBlogers(take: number) {
    const topBlogers = await this.prismaService.user.findMany({
      take,
      include: this.populateUserInclude(),
      orderBy: {
        followedBy: {
          _count: 'desc',
        },
      },
    });

    return topBlogers;
  }

  async getBloger(bloger: string) {
    const foundBloger = await this.prismaService.user.findUnique({
      where: {
        username: bloger,
      },
      include: this.populateUserInclude(),
    });

    if (!foundBloger) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    return foundBloger;
  }

  private populateUserInclude() {
    return {
      profile: true,
      _count: {
        select: {
          articles: true,
          followedBy: true,
          following: true,
        },
      },
    } satisfies Prisma.UserInclude;
  }
}
