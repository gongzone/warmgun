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

import { CommentService } from './comment.service';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { GetUser } from 'src/lib/decorators/user.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/articles/:articleId')
  @HttpCode(HttpStatus.OK)
  async findArticleComments(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query('parentId') parentId: number | undefined,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.commentService.findArticleComments({
      articleId,
      parentId: parentId ? +parentId : null,
      cursor,
    });
  }

  @UseGuards(AuthGuard('access'))
  @Post('/articles/:articleId')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetUser('id') userId: number,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query('parentId') parentId: number | undefined,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    await this.commentService.create({
      userId,
      articleId,
      parentId: parentId ? +parentId : null,
      createCommentDto,
    });

    return { message: '댓글 생성 성공' };
  }
}
