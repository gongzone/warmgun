import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DraftService } from './draft.service';
import { JwtAccessAuthGuard } from '../auth/lib/guards/access.guard';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';

@Controller('draft')
@UseGuards(JwtAccessAuthGuard)
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getDraftById(@GetUser() user: RequestUser, @Param('id') id: string) {
    return await this.draftService.getDraftBy(user.id, parseInt(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async craeteDraft(@GetUser() user: RequestUser) {
    return await this.draftService.createDraft(user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteDraft(@GetUser() user: RequestUser, @Param('id') id: string) {
    return await this.draftService.deleteDraft(user.id, parseInt(id));
  }
}
