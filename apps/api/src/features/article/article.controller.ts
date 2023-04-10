import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { GetUser } from 'src/lib/decorators/user.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { ArticleFindAllMode } from './types';
import { ReqUserInterceptor } from 'src/lib/interceptors/reqUser.interceptor';
import { AuthGuard } from 'src/lib/guards/auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('mode') mode: ArticleFindAllMode,
    @Query('cursor') cursor: string | undefined,
  ) {
    return await this.articleService.findAll({
      mode,
      cursor: cursor ? +cursor : undefined,
    });
  }

  @UseInterceptors(ReqUserInterceptor)
  @Get('/:slug')
  @HttpCode(HttpStatus.OK)
  async findBlogerArticle(
    @GetUser('id') userId: number,
    @Param('slug') slug: string,
  ) {
    const newSlug = slug.replace(' ', '/');
    return await this.articleService.findBlogerArticle(userId, newSlug);
  }

  @Get('/blogers/:username')
  @HttpCode(HttpStatus.OK)
  async findBlogerArticles(
    @Param('username') username: string,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.articleService.findBlogerArticles(username, cursor);
  }

  @UseGuards(AuthGuard('access'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetUser('id') userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    await this.articleService.create(userId, createArticleDto);
    return { message: '아티클 생성 성공' };
  }

  @UseGuards(AuthGuard('access'))
  @Post('/likes/:id')
  @HttpCode(HttpStatus.OK)
  async like(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    await this.articleService.like(userId, articleId);
    return { message: '아티클 좋아요 성공' };
  }

  @UseGuards(AuthGuard('access'))
  @Delete('/likes/:id')
  @HttpCode(HttpStatus.OK)
  async unlikeArticle(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    await this.articleService.unlike(userId, articleId);
    return { message: '아티클 좋아요 취소 성공' };
  }
}
