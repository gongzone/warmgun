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
import { ReqUserInterceptor } from 'src/lib/interceptors/reqUser.interceptor';
import { AuthGuard } from 'src/lib/guards/auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/best')
  @HttpCode(HttpStatus.OK)
  async findBestArticles(@Query('take', ParseIntPipe) take: number) {
    return await this.articleService.findBestArticles(take);
  }

  @Get('/hot')
  @HttpCode(HttpStatus.OK)
  async findHotArticles(
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.articleService.findHotArticles(take, cursor);
  }

  @UseInterceptors(ReqUserInterceptor)
  @Get('/:slug')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @GetUser('id') userId: number | null,
    @Param('slug') slug: string,
  ) {
    const newSlug = slug.replace('-', '/');
    return await this.articleService.findOne(userId, newSlug);
  }

  @Get('/:username/users')
  @HttpCode(HttpStatus.OK)
  async findUserArticles(
    @Param('username') username: string,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.articleService.findUserArticles(username, take, cursor);
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
  @Post('/:id/likes')
  @HttpCode(HttpStatus.OK)
  async like(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.articleService.like(userId, id);
    return { message: '아티클 좋아요 성공' };
  }

  @UseGuards(AuthGuard('access'))
  @Delete('/:id/likes')
  @HttpCode(HttpStatus.OK)
  async unlike(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.articleService.unlike(userId, id);
    return { message: '아티클 좋아요 취소 성공' };
  }
}
