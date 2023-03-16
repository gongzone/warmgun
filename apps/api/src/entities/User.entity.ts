import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  OneToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import Draft from './Draft.entity';
import Profile from './Profile.entity';
import Token from './Token.entity';

@Entity()
class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  username!: string;

  @Property()
  password!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Enum(() => UserRole)
  role: UserRole = UserRole.USER;

  @OneToOne(() => Profile, (profile) => profile.user, { orphanRemoval: true })
  profile!: Profile;

  @OneToMany(() => Token, (Token) => Token.user, { orphanRemoval: true })
  tokens = new Collection<Token>(this);

  @OneToMany(() => Draft, (Draft) => Draft.user, { orphanRemoval: true })
  drafts = new Collection<Draft>(this);
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export default User;
