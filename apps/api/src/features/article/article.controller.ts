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
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { GetUser } from 'src/lib/decorators/user.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { ReqUserInterceptor } from 'src/lib/interceptors/reqUser.interceptor';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { UpdateArticleDto } from './dtos';

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

  @Get('/:username/users')
  @HttpCode(HttpStatus.OK)
  async findUserArticles(
    @Param('username') username: string,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.articleService.findUserArticles(username, take, cursor);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOnePublished(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.articleService.findOnePublished(userId, id);
  }

  @UseInterceptors(ReqUserInterceptor)
  @Get('/:username/:slug')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @GetUser('id') userId: number | null,
    @Param('username') username: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.findOne(userId, username, slug);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetUser('id') userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    await this.articleService.create(userId, createArticleDto);
    return { message: '아티클 생성 성공' };
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    await this.articleService.update(userId, id, updateArticleDto);
    return { message: '아티클 수정 성공' };
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.articleService.delete(userId, id);
    return { message: '아티클 삭제' };
  }

  @UseGuards(AuthGuard)
  @Post('/:id/likes')
  @HttpCode(HttpStatus.OK)
  async like(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.articleService.like(userId, id);
    return { message: '아티클 좋아요 성공' };
  }

  @UseGuards(AuthGuard)
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
