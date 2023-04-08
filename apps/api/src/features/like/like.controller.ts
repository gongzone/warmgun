import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { RequestUser } from 'src/lib/types/request-user';
import { ToggleLikeDTO } from './lib/dtos';
import { LikeService } from './like.service';

@UseGuards(AuthGuard('access'))
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async toggleLike(
    @GetUser() user: RequestUser,
    @Body() toggleLikeDTO: ToggleLikeDTO,
  ) {
    return await this.likeService.toggleLike(user.id, toggleLikeDTO);
  }
}
