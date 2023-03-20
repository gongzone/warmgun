import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  JsonType,
} from '@mikro-orm/core';
import User from './User.entity';

@Entity()
class Draft {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string = '';

  @Property()
  subTitle: string = '';

  @Property({ type: 'json', nullable: true })
  body?: JsonType;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToOne(() => User)
  user!: User;
}

export default Draft;
