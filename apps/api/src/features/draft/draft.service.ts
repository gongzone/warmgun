import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { SaveDraftDTO } from './lib/dtos';

@Injectable()
export class DraftService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDraft(userId: number, draftId: number) {
    const draft = await this.prismaService.draft.findFirst({
      where: {
        AND: [{ id: draftId }, { authorId: userId }],
      },
    });

    if (!draft) {
      throw new ForbiddenException('접근이 제한된 요청입니다.');
    }

    return draft;
  }

  async createDraft(userId: number) {
    const draft = await this.prismaService.draft.create({
      data: {
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return draft;
  }

  async saveDraft(userId: number, draftId: number, saveDraftDTO: SaveDraftDTO) {
    const { title, subTitle, body } = saveDraftDTO;

    const draft = await this.prismaService.draft.updateMany({
      where: {
        AND: [{ id: draftId }, { authorId: userId }],
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

  async deleteDraft(userId: number, draftId: number) {
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
        AND: [{ id: draftId }, { authorId: userId }],
      },
    });
  }
}
