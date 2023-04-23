import { Prisma } from '@prisma/client';
import { IsString, IsArray } from 'class-validator';

export class CreateArticleDto {
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
