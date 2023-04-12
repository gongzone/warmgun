import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../@base/prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { buildPaginationData } from 'src/lib/utils/infinitePagination';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findArticleComments({
    articleId,
    parentId,
    take,
    cursor,
  }: {
    articleId: number;
    parentId: number | null;
    take: number;
    cursor: number;
  }) {
    const comments = await this.prismaService.comment.findMany({
      take: take,
      skip: take * cursor,
      where: {
        AND: [{ articleId }, { parentId }],
      },
      include: this.commentInclude,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return buildPaginationData(comments, take, cursor);
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
      _count: {
        select: {
          children: true,
        },
      },
    } satisfies Prisma.CommentInclude;
  }
}
