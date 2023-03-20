import { IsString, Matches, IsEmail } from 'class-validator';
import { Match } from 'src/lib/decorators/match';

export class SaveDTO {
  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  @IsString()
  body: string;
}
