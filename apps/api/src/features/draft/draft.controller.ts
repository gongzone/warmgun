import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { DraftService } from './draft.service';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { SaveDraftDto } from './dtos';

@Controller('drafts')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @UseGuards(AuthGuard('access'))
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async findMyDrafts(@GetUser('id') userId: number) {
    return await this.draftService.findMyDrafts(userId);
  }

  @UseGuards(AuthGuard('access'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.draftService.findOne(userId, id);
  }

  @UseGuards(AuthGuard('access'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async craete(@GetUser('id') userId: number) {
    await this.draftService.create(userId);
    return { message: '초고 생성 완료' };
  }

  @UseGuards(AuthGuard('access'))
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async save(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() saveDraftDto: SaveDraftDto,
  ) {
    await this.draftService.save(userId, id, saveDraftDto);
    return { message: '초고 저장 완료' };
  }

  @UseGuards(AuthGuard('access'))
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.draftService.delete(userId, id);
    return { message: '초고 삭제 완료' };
  }
}
