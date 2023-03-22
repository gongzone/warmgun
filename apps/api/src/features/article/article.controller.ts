import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';
import { JwtAccessAuthGuard } from '../auth/lib/guards/access.guard';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './lib/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArticle(
    @GetUser() user: RequestUser,
    @Body() createArticleDTO: CreateArticleDTO,
  ) {
    return await this.articleService.createArticle(user.id, createArticleDTO);
  }
}
