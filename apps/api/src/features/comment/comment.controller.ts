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
import { CreateCommentDTO } from './lib/dtos/create-comment.dto';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':articleId')
  @HttpCode(HttpStatus.OK)
  async getParentComments(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.commentService.getParentComments(articleId, {
      take,
      cursor,
    });
  }

  @Get('/:articleId/:parentId')
  @HttpCode(HttpStatus.OK)
  async getChildrenComments(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('parentId', ParseIntPipe) parentId: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.commentService.getChildrenComments(articleId, parentId, {
      take,
      cursor,
    });
  }

  @UseGuards(AuthGuard('access'))
  @Post(':articleId')
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @GetUser() user: RequestUser,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query('parentId') parentId: number,
    @Body() createCommentDTO: CreateCommentDTO,
  ) {
    return await this.commentService.createComment(
      user.id,
      articleId,
      +parentId,
      createCommentDTO,
    );
  }
}
