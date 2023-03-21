import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async searchTags(
    @Query('input') input: string,
    @Query('exclude') exclude: string,
  ) {
    const excludes = exclude ? exclude.split(',').map((tag) => tag) : [];
    return await this.tagService.searchTags(input, excludes);
  }
}
