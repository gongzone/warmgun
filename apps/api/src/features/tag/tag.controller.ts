import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async searchTags(
    @Query('input') input: string,
    @Query('excludes') excludes: string,
  ) {
    const excludesArray = excludes ? excludes.split(',').map((tag) => tag) : [];
    return await this.tagService.searchTags(input, excludesArray);
  }
}
