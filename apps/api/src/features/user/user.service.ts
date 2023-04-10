import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserFindAllMode } from './types';
import { PrismaService } from '../@base/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ mode }: { mode: UserFindAllMode }) {
    if (mode === 'top') {
      return await this.findTopUsers();
    }
  }

  async findMe(id: number) {
    const me = await this.prismaService.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!me) {
      throw new UnauthorizedException('해당 사용자를 찾을 수 없습니다.');
    }

    return me;
  }

  async findOne(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: this.userSelect,
    });

    if (!user) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    return user;
  }

  private async findTopUsers() {
    return await this.prismaService.user.findMany({
      take: 10,
      select: this.userSelect,
      orderBy: {
        followedBy: {
          _count: 'desc',
        },
      },
    });
  }

  private get userSelect() {
    return {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      role: true,
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
    } satisfies Prisma.UserSelect;
  }
}
