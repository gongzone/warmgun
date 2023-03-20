import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Article } from './Article.entity';
import { User } from './User.entity';

@Entity()
export class Comment {
  @PrimaryKey()
  id!: number;

  @Property()
  content!: string;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children = new Collection<Comment>(this);

  @ManyToOne(() => Comment, { nullable: true })
  parent?: Comment;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Article)
  article!: Article;
}
