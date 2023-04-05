import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/top')
  @HttpCode(HttpStatus.OK)
  async getTopBlogers(@Query('take', ParseIntPipe) take: number) {
    return await this.userService.getTopBlogers(take);
  }

  @Get(':bloger')
  @HttpCode(HttpStatus.OK)
  async getBloger(@Param('bloger') bloger: string) {
    return await this.userService.getBloger(bloger);
  }
}
