import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/features/auth/lib/guards/access.guard';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';
import { ImageService } from './image.service';
import { CreatePresignedUrlDTO } from './lib/dtos';

@Controller('image')
@UseGuards(JwtAccessAuthGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/presigned')
  @HttpCode(HttpStatus.OK)
  async createPresignedUrl(
    @GetUser() user: RequestUser,
    @Body() createPresignedUrlDTO: CreatePresignedUrlDTO,
  ) {
    return this.imageService.createPresignedUrl(
      user.username,
      createPresignedUrlDTO,
    );
  }
}
