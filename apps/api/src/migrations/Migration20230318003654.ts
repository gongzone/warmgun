import { Migration } from '@mikro-orm/migrations';

export class Migration20230318003654 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "draft" alter column "title" type varchar(255) using ("title"::varchar(255));');
    this.addSql('alter table "draft" alter column "title" set default \'\';');
    this.addSql('alter table "draft" alter column "sub_title" type varchar(255) using ("sub_title"::varchar(255));');
    this.addSql('alter table "draft" alter column "sub_title" set default \'\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "draft" alter column "title" type varchar using ("title"::varchar);');
    this.addSql('alter table "draft" alter column "title" set default \'무제\';');
    this.addSql('alter table "draft" alter column "sub_title" type varchar using ("sub_title"::varchar);');
    this.addSql('alter table "draft" alter column "sub_title" set default \'멋진 글을 작성해보세요.\';');
  }

}
