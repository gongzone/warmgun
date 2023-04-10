import { IsString } from 'class-validator';

export class CreatePresignedUrlDto {
  @IsString()
  contentType: string;
}
