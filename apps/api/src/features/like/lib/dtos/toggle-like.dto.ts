import { IsString } from 'class-validator';

export class ToggleLikeDTO {
  @IsString()
  slug: string;
}
