import { Migration } from '@mikro-orm/migrations';

export class Migration20230320092604 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "draft" alter column "body" drop default;');
    this.addSql('alter table "draft" alter column "body" type jsonb using ("body"::jsonb);');
    this.addSql('alter table "draft" alter column "body" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "draft" alter column "body" type varchar(255) using ("body"::varchar(255));');
    this.addSql('alter table "draft" alter column "body" set default \'\';');
    this.addSql('alter table "draft" alter column "body" set not null;');
  }

}
