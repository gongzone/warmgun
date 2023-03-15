import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from 'src/entities/User.entity';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async getMe(id: number) {
    const me = await this.userRepository.findOne(
      {
        id,
      },
      {
        populate: [
          'id',
          'username',
          'email',
          'role',
          'profile.nickname',
          'profile.bio',
          'profile.avatar',
        ],
      },
    );

    if (!me) {
      throw new UnauthorizedException('해당 사용자를 찾을 수 없습니다.');
    }

    return me;
  }
}
