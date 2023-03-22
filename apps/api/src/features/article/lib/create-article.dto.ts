import { Prisma } from '@prisma/client';
import { IsString, IsArray } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  body: Prisma.JsonObject;

  @IsString()
  coverImage: string;

  @IsString()
  slug: string;

  @IsArray()
  tags: string[];
}
