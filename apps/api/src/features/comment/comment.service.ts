import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { PaginationData } from 'src/lib/types/pagination';
import { Prisma } from '@prisma/client';
import { CreateCommentDto } from './dtos/create-comment.dto';

const COMMENT_PAGINATION_TAKE = 10;

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findArticleComments({
    articleId,
    parentId,
    cursor,
  }: {
    articleId: number;
    parentId: number | null;
    cursor: number;
  }) {
    const comments = await this.prismaService.comment.findMany({
      take: COMMENT_PAGINATION_TAKE,
      skip: COMMENT_PAGINATION_TAKE * cursor,
      where: {
        AND: [{ articleId }, { parentId }],
      },
      include: this.commentInclude,
    });

    return {
      comments,
      nextCursor:
        comments.length === COMMENT_PAGINATION_TAKE ? cursor + 1 : undefined,
    };
  }

  async create({
    userId,
    articleId,
    parentId,
    createCommentDto,
  }: {
    userId: number;
    articleId: number;
    parentId: number | null;
    createCommentDto: CreateCommentDto;
  }) {
    const { content } = createCommentDto;

    await this.prismaService.comment.create({
      data: {
        content,
        parent: parentId ? { connect: { id: parentId } } : undefined,
        user: { connect: { id: userId } },
        article: { connect: { id: articleId } },
      },
    });
  }

  private get commentInclude() {
    return {
      user: {
        select: {
          profile: true,
        },
      },
    } satisfies Prisma.CommentInclude;
  }
}
