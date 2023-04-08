import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { RequestUser } from 'src/lib/types/request-user';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { MeService } from './me.service';

@UseGuards(AuthGuard('access'))
@Controller('me')
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
