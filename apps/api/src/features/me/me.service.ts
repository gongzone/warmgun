import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';

@Injectable()
export class MeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMe(userId: number) {
    const me = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profile: {
          select: {
            nickname: true,
            bio: true,
            avatar: true,
          },
        },
      },
    });

    if (!me) {
      throw new UnauthorizedException('해당 사용자를 찾을 수 없습니다.');
    }

    return me;
  }

  async getMyDrafts(userId: number) {
    const myDrafts = await this.prismaService.draft.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        subTitle: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return myDrafts;
  }
}
