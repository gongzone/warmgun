import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';
import { UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findTopUsers(take: number) {
    const users = await this.prismaService.user.findMany({
      take: take,
      select: this.userSelect,
      orderBy: {
        followedBy: {
          _count: 'desc',
        },
      },
    });

    return users;
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

  async findOne(userId: number | null, username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: {
        ...this.userSelect,
        followedBy: userId ? { where: { followerId: userId } } : false,
      },
    });

    if (!user) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    return {
      ...user,
      isFollowed: !!user.followedBy?.length,
      isOwner: userId === user.id,
    };
  }

  async updateMyProfile(id: number, updateUserDto: UpdateUserDto) {
    const { nickname, bio, avatar } = updateUserDto;

    await this.prismaService.user.update({
      where: { id },
      data: {
        profile: {
          update: {
            nickname,
            bio,
            avatar,
          },
        },
      },
    });
  }

  async deleteMe(id: number) {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async follow(userId: number, id: number) {
    await this.prismaService.follows.create({
      data: {
        followerId: userId,
        followingId: id,
      },
    });
  }

  async unfollow(userId: number, id: number) {
    await this.prismaService.follows.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: id,
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
