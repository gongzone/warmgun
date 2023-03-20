import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Article } from './Article.entity';

@Entity()
export class Tag {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @ManyToMany(() => Article, (article) => article.tags, { owner: true })
  articles = new Collection<Article>(this);
}
