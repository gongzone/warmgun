import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import User from './User.entity';

@Entity()
class Token {
  @PrimaryKey()
  id!: number;

  @Property()
  refreshToken!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToOne(() => User)
  user!: User;
}

export default Token;
