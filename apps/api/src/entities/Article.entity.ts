import {
  Collection,
  Entity,
  JsonType,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Like } from './Like.entity';
import { Tag } from './Tag.entity';
import { Comment } from './Comment.entity';
import { User } from './User.entity';

@Entity()
export class Article {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  subTitle!: string;

  @Property({ type: 'json' })
  body!: JsonType;

  @Property({ nullable: true })
  coverImage?: string;

  @Property({ unique: true })
  slug!: string;

  @Property({ type: 'float', default: 0 })
  trendingScore!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => Like, (like) => like.article, { orphanRemoval: true })
  likes = new Collection<Like>(this);

  @OneToMany(() => Comment, (comment) => comment.article, {
    orphanRemoval: true,
  })
  comments = new Collection<Comment>(this);

  @ManyToMany(() => Tag, (tag) => tag.articles)
  tags = new Collection<Tag>(this);
}
