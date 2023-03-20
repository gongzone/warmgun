import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Article } from './Article.entity';
import { User } from './User.entity';

@Entity()
export class Like {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Article)
  article!: Article;
}
