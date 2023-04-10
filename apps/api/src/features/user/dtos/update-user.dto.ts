import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  nickname: string;

  @IsString()
  bio: string;

  avatar: string | null;
}
