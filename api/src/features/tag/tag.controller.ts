import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/popular')
  @HttpCode(HttpStatus.OK)
  async findPopularTags(@Query('take', ParseIntPipe) take: number) {
    return await this.tagService.findPopularTags(take);
  }

  @Get('/:name')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('name') name: string) {
    return await this.tagService.findOne(name);
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
