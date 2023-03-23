import { Injectable } from '@nestjs/common';
import { PrismaService } from '../@base/prisma/prisma.service';
import { ToggleLikeDTO } from './lib/dtos';

@Injectable()
export class LikeService {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async toggleLike(userId: number, toggleLikeDTO: ToggleLikeDTO) {
    const { slug } = toggleLikeDTO;

    const foundArticle = await this.prismaSerivce.article.findUnique({
      where: {
        slug,
      },
    });

    const foundLike = await this.prismaSerivce.like.findFirst({
      where: {
        AND: [{ userId }, { articleId: foundArticle.id }],
      },
    });

    if (!foundLike) {
      await this.prismaSerivce.like.delete({
        where: {
          id: foundLike.id,
        },
      });
    } else {
      await this.prismaSerivce.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          article: {
            connect: {
              id: foundArticle.id,
            },
          },
        },
      });
    }
  }
}
