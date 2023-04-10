import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/lib/guards/auth.guard';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { ImageService } from './image.service';
import { CreatePresignedUrlDto } from './dtos';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(AuthGuard('access'))
  @Post('/presigned')
  @HttpCode(HttpStatus.OK)
  async createPresignedUrl(
    @GetUser('username') username: string,
    @Body() createPresignedUrlDto: CreatePresignedUrlDto,
  ) {
    return this.imageService.createPresignedUrl(
      username,
      createPresignedUrlDto,
    );
  }
}
