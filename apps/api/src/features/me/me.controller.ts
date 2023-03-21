import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';
import { JwtAccessAuthGuard } from '../auth/lib/guards/access.guard';
import { MeService } from './me.service';

@Controller('me')
@UseGuards(JwtAccessAuthGuard)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMe(@GetUser() user: RequestUser) {
    return await this.meService.getMe(user.id);
  }

  @Get('/drafts')
  @HttpCode(HttpStatus.OK)
  async getMyDrafts(@GetUser() user: RequestUser) {
    return await this.meService.getMyDrafts(user.id);
  }
}
