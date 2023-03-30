import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
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

  @Get('/best')
  @HttpCode(HttpStatus.OK)
  async getBestArticles(@Query('take', ParseIntPipe) take: number) {
    return await this.articleService.getBestArticles(take);
  }

  @Get('/hot')
  @HttpCode(HttpStatus.OK)
  async getHotArticles(
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.articleService.getHotArticles(take, cursor);
  }

  @Get('/:username/:slug')
  @HttpCode(HttpStatus.OK)
  async getArticleBySlug(
    @Param('username') username: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.getArticleBySlug(username, slug);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getArticlesByPagination(
    @Query('username') username: string,
    @Query('take') take: string,
    @Query('cursor') cursor: string | undefined,
  ) {
    const newCursor = cursor ? parseInt(cursor) : undefined;

    return await this.articleService.getArticlesByPagination(
      username,
      parseInt(take),
      newCursor,
    );
  }

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
