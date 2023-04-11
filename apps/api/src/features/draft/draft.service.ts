import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { SaveDraftDto } from './dtos';

@Injectable()
export class DraftService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMyDrafts(userId: number) {
    const drafts = await this.prismaService.draft.findMany({
      where: { authorId: userId },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return drafts;
  }

  async findOne(userId: number, id: number) {
    const draft = await this.prismaService.draft.findFirst({
      where: {
        AND: [{ id }, { authorId: userId }],
      },
    });

    if (!draft) {
      throw new ForbiddenException('접근이 제한된 요청입니다.');
    }

    return draft;
  }

  async create(userId: number) {
    const draftCount = await this.prismaService.draft.count({
      where: { authorId: userId },
    });

    if (draftCount >= 10) {
      throw new BadRequestException('초고는 10개까지만 생성 가능합니다. 😅');
    }

    await this.prismaService.draft.create({
      data: {
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async save(userId: number, id: number, saveDraftDTO: SaveDraftDto) {
    const { title, subTitle, body } = saveDraftDTO;

    const draft = await this.prismaService.draft.updateMany({
      where: {
        AND: [{ id }, { authorId: userId }],
      },
      data: {
        title,
        subTitle,
        body,
      },
    });

    if (!draft) {
      throw new ForbiddenException('접근이 제한된 요청입니다.');
    }

    return draft;
  }

  async delete(userId: number, id: number) {
    const draftCount = await this.prismaService.draft.count({
      where: {
        authorId: userId,
      },
    });

    if (draftCount <= 1) {
      throw new BadRequestException('마지막 초고는 삭제하실 수 없습니다. 😅');
    }

    await this.prismaService.draft.deleteMany({
      where: {
        AND: [{ id: id }, { authorId: userId }],
      },
    });
  }
}
