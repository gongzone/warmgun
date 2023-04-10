import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagFindAllMode } from './types';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('mode') mode: TagFindAllMode) {
    return await this.tagService.findAll({ mode });
  }

  /* Todo: meilisearch로 교체 */
  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async searchTags(
    @Query('input') input: string,
    @Query('excludes') excludes: string,
  ) {
    const excludesArray = excludes ? excludes.split(',').map((tag) => tag) : [];
    return await this.tagService.searchTags(input, excludesArray);
  }
}
