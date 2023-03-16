import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import User from './User.entity';

@Entity()
class Draft {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string = '무제';

  @Property()
  subTitle: string = '멋진 글을 작성해보세요.';

  @Property()
  body: string = '';

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToOne(() => User)
  user!: User;
}

export default Draft;
