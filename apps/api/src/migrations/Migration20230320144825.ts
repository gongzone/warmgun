import { Migration } from '@mikro-orm/migrations';

export class Migration20230320144825 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag" ("id" serial primary key, "name" varchar(255) not null);');
    this.addSql('alter table "tag" add constraint "tag_name_unique" unique ("name");');

    this.addSql('create table "article" ("id" serial primary key, "title" varchar(255) not null, "sub_title" varchar(255) not null, "body" jsonb not null, "cover_image" varchar(255) null, "slug" varchar(255) not null, "trending_score" real not null default 0, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int not null);');
    this.addSql('alter table "article" add constraint "article_slug_unique" unique ("slug");');

    this.addSql('create table "tag_articles" ("tag_id" int not null, "article_id" int not null, constraint "tag_articles_pkey" primary key ("tag_id", "article_id"));');

    this.addSql('create table "like" ("id" serial primary key, "user_id" int not null, "article_id" int not null);');

    this.addSql('create table "comment" ("id" serial primary key, "content" varchar(255) not null, "parent_id" int null, "user_id" int not null, "article_id" int not null);');

    this.addSql('alter table "article" add constraint "article_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "tag_articles" add constraint "tag_articles_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "tag_articles" add constraint "tag_articles_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "like" add constraint "like_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "like" add constraint "like_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_parent_id_foreign" foreign key ("parent_id") references "comment" ("id") on update cascade on delete set null;');
    this.addSql('alter table "comment" add constraint "comment_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tag_articles" drop constraint "tag_articles_tag_id_foreign";');

    this.addSql('alter table "tag_articles" drop constraint "tag_articles_article_id_foreign";');

    this.addSql('alter table "like" drop constraint "like_article_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_article_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_parent_id_foreign";');

    this.addSql('drop table if exists "tag" cascade;');

    this.addSql('drop table if exists "article" cascade;');

    this.addSql('drop table if exists "tag_articles" cascade;');

    this.addSql('drop table if exists "like" cascade;');

    this.addSql('drop table if exists "comment" cascade;');
  }

}
