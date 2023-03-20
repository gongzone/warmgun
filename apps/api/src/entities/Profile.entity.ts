import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { User } from './User.entity';

@Entity()
export class Profile {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  nickname!: string;

  @Property()
  bio!: string;

  @Property({ nullable: true })
  avatar?: string;

  @OneToOne(() => User, (user) => user.profile, { owner: true })
  user!: User;
}
