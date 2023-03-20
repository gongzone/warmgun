import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Draft } from 'src/entities/Draft.entity';
import { SaveDTO } from './lib/dtos';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft)
    private readonly draftRepository: EntityRepository<Draft>,
  ) {}

  async getDraftBy(userId: number, draftId: number) {
    const draft = await this.draftRepository.findOne({
      $and: [{ id: draftId, user: userId }],
    });

    if (!draft) {
      throw new ForbiddenException('접근이 제한된 요청입니다.');
    }

    return draft;
  }

  async createDraft(userId: number) {
    const draft = this.draftRepository.create({
      user: userId,
    });

    await this.draftRepository.flush();

    return draft;
  }

  async saveDraft(userId: number, draftId: number, saveDTO: SaveDTO) {
    await this.draftRepository
      .qb()
      .update(saveDTO)
      .where({ $and: [{ id: draftId, user: userId }] });

    await this.draftRepository.flush();
  }

  async deleteDraft(userId: number, draftId: number) {
    const result = await this.draftRepository
      .qb()
      .delete()
      .where({ $and: [{ id: draftId, user: userId }] })
      .andWhere(`(SELECT COUNT(*) FROM draft WHERE user_id = ${userId}) > 1`);

    if (result.affectedRows === 0) {
      throw new BadRequestException('마지막 초고는 삭제하실 수 없습니다. 😅');
    }
  }
}
