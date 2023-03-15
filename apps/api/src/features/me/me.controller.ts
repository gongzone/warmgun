import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/lib/types/request-with-user';
import { JwtAccessAuthGuard } from '../auth/lib/guards/access.guard';
import { MeService } from './me.service';

@Controller('me')
@UseGuards(JwtAccessAuthGuard)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() req: RequestWithUser) {
    const { id } = req.user;
    return await this.meService.getMe(id);
  }
}
