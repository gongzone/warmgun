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

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async searchArticles(
    @Query('search') search: string,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.articleService.searchArticles(search, {
      take,
      cursor,
    });
  }

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

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  async getBlogerArticles(
    @Param('username') username: string,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.articleService.getBlogerArticles(username, {
      take,
      cursor,
    });
  }

  @Get('/:username/:slug')
  @HttpCode(HttpStatus.OK)
  async getBlogerArticle(
    @Param('username') username: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.getBlogerArticle(username, slug);
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
