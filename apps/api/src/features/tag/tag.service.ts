import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Tag } from 'src/entities/Tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async searchTags(input: string, excludes: string[] = []) {
    const tags = await this.tagRepository
      .qb('t')
      .leftJoinAndSelect('t.articles', 'a')
      .count('a.id')
      .select(['t.name', 'a'])
      .where({
        $and: [{ name: { $fulltext: input } }, { name: { $nin: excludes } }],
      })
      .groupBy(['t.name', 'a.id'])
      .orderBy({
        'COUNT(a.id)': 'ASC',
      })
      .limit(5)
      .execute();

    console.log(tags);
  }
}
