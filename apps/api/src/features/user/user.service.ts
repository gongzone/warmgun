import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTopBlogers(take: number) {
    const topBlogers = await this.prismaService.user.findMany({
      take,
      include: this.getUserInclude(),
      orderBy: {
        followedBy: {
          _count: 'desc',
        },
      },
    });

    return topBlogers;
  }

  async getUserByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
      select: {
        profile: {
          select: {
            nickname: true,
            bio: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            articles: true,
            followedBy: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    return {
      nickname: user.profile.nickname,
      bio: user.profile.bio,
      avatar: user.profile.avatar,
      articleCount: user._count.articles,
      followedByCount: user._count.followedBy,
      followingCount: user._count.following,
    };
  }

  private getUserInclude() {
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
