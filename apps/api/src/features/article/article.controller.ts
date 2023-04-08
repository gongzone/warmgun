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
} from '@nestjs/common';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';

import { ArticleService } from './article.service';
import { CreateArticleDTO } from './lib/create-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return;
  }

  // @Get('')
  // @HttpCode(HttpStatus.OK)
  // async searchArticles(
  //   @Query('search') search: string,
  //   @Query('take', ParseIntPipe) take: number,
  //   @Query('cursor', ParseIntPipe) cursor: number,
  // ) {
  //   return await this.articleService.searchArticles(search, {
  //     take,
  //     cursor,
  //   });
  // }

  // @Get('/best')
  // @HttpCode(HttpStatus.OK)
  // async getBestArticles(@Query('take', ParseIntPipe) take: number) {
  //   return await this.articleService.getBestArticles(take);
  // }

  // @Get('/hot')
  // @HttpCode(HttpStatus.OK)
  // async getHotArticles(
  //   @Query('take', ParseIntPipe) take: number,
  //   @Query('cursor', ParseIntPipe) cursor: number,
  // ) {
  //   return await this.articleService.getHotArticles(take, cursor);
  // }

  // @Get(':username')
  // @HttpCode(HttpStatus.OK)
  // async getBlogerArticles(
  //   @Param('username') username: string,
  //   @Query('take', ParseIntPipe) take: number,
  //   @Query('cursor', ParseIntPipe) cursor: number,
  // ) {
  //   return await this.articleService.getBlogerArticles(username, {
  //     take,
  //     cursor,
  //   });
  // }

  // @UseGuards(JwtCheckGuard)
  // @Get('/:username/:slug')
  // @HttpCode(HttpStatus.OK)
  // async getBlogerArticle(
  //   @GetUser() user: RequestUser,
  //   @Param('username') username: string,
  //   @Param('slug') slug: string,
  // ) {
  //   return await this.articleService.getBlogerArticle(username, slug, user?.id);
  // }

  // @UseGuards(JwtAccessAuthGuard)
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async createArticle(
  //   @GetUser() user: RequestUser,
  //   @Body() createArticleDTO: CreateArticleDTO,
  // ) {
  //   return await this.articleService.createArticle(user.id, createArticleDTO);
  // }

  // @UseGuards(JwtAccessAuthGuard)
  // @Post('/:id/likes')
  // @HttpCode(HttpStatus.OK)
  // async likeArticle(
  //   @GetUser() user: RequestUser,
  //   @Param('id', ParseIntPipe) articleId: number,
  // ) {
  //   return await this.articleService.likeArticle(user.id, articleId);
  // }

  // @UseGuards(JwtAccessAuthGuard)
  // @Delete('/:id/likes')
  // @HttpCode(HttpStatus.OK)
  // async unlikeArticle(
  //   @GetUser() user: RequestUser,
  //   @Param('id', ParseIntPipe) articleId: number,
  // ) {
  //   return await this.articleService.unlikeArticle(user.id, articleId);
  // }
}
