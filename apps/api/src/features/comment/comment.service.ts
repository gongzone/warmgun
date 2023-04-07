import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { PaginationData } from 'src/lib/types/pagination';
import { Prisma } from '@prisma/client';
import { CreateCommentDTO } from './lib/dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getParentComments(articleId: number, paginationData: PaginationData) {
    const { take, cursor } = paginationData;

    const comments = await this.prismaService.comment.findMany({
      take,
      skip: take * cursor,
      where: {
        AND: [{ articleId }, { parentId: null }],
      },
      include: this.populateComment(),
    });

    return {
      comments,
      nextCursor: comments.length === take ? cursor + 1 : undefined,
    };
  }

  async getChildrenComments(
    articleId: number,
    parentId: number,
    paginationData: PaginationData,
  ) {
    const { take, cursor } = paginationData;

    const comments = await this.prismaService.comment.findMany({
      take,
      skip: take * cursor,
      where: {
        AND: [{ articleId }, { parentId }],
      },
      include: this.populateComment(),
    });

    return {
      comments,
      nextCursor: comments.length === take ? cursor + 1 : undefined,
    };
  }

  async createComment(
    userId: number,
    articleId: number,
    parentId: number,
    createCommentDTO: CreateCommentDTO,
  ) {
    console.log(createCommentDTO, userId, articleId);
    const { content } = createCommentDTO;

    await this.prismaService.comment.create({
      data: {
        content,
        parent: parentId
          ? {
              connect: {
                id: parentId,
              },
            }
          : undefined,
        user: {
          connect: {
            id: userId,
          },
        },
        article: {
          connect: {
            id: articleId,
          },
        },
      },
    });
  }

  private populateComment() {
    return {
      user: {
        select: {
          profile: true,
        },
      },
    } satisfies Prisma.CommentInclude;
  }
}
