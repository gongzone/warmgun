import { IsNumber } from 'class-validator';

export class LikeArticleDTO {
  @IsNumber()
  articleId: number;
}
