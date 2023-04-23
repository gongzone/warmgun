import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async searchAll(
    @Query('q') q: string,
    @Query('type') type: 'articles' | 'users' | 'tags',
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ) {
    return await this.searchService.searchAll(q, type, take, cursor);
  }
}
