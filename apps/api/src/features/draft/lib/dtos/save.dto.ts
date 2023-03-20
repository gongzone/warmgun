import { JsonType } from '@mikro-orm/core';
import { IsString } from 'class-validator';

export class SaveDTO {
  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  body: JsonType;
}
