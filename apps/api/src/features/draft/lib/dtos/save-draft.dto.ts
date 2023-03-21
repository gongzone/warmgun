import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class SaveDraftDTO {
  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  body: Prisma.JsonObject;
}
