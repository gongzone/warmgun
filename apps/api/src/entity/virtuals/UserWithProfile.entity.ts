import { Entity, Property, Enum } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import User, { UserRole } from '../User.entity';

@Entity({
  expression: (em: EntityManager) =>
    em
      .createQueryBuilder(User, 'u')
      .select(['u.username', 'u.role', 'p.nickname', 'p.avatar'])
      .join('u.profile', 'p')
      .groupBy('u.id'),
})
class UserWithProfile {
  @Property()
  username!: string;

  @Enum()
  role!: UserRole;

  @Property()
  nickname!: string;

  @Property({ nullable: true })
  avatar?: string;
}

export { UserRole } from '../User.entity';

export default UserWithProfile;
