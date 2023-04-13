import { Prisma } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  body: Prisma.JsonObject;

  coverImage: string | null;

  @IsString()
  slug: string;

  @IsArray()
  tags: string[];
}
