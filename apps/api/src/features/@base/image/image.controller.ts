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
import { RequestUser } from 'src/lib/types/request-user';
import { ImageService } from './image.service';
import { CreatePresignedUrlDTO } from './lib/dtos';

@UseGuards(AuthGuard('access'))
@Controller('image')
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
