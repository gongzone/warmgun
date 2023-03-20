import { IsString } from 'class-validator';

export class CreatePresignedUrlDTO {
  @IsString()
  contentType: string;
}
