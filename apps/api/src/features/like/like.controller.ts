import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';
import { JwtAccessAuthGuard } from '../auth/lib/guards/access.guard';
import { ToggleLikeDTO } from './lib/dtos';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async toggleLike(
    @GetUser() user: RequestUser,
    @Body() toggleLikeDTO: ToggleLikeDTO,
  ) {
    return await this.likeService.toggleLike(user.id, toggleLikeDTO);
  }
}
