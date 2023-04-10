import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { UserFindAllMode } from './types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* Check */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('mode') mode: UserFindAllMode) {
    return await this.userService.findAll({ mode });
  }

  /* Check */
  @UseGuards(AuthGuard('access'))
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async findMe(@GetUser('id') userId: number) {
    return await this.userService.findMe(userId);
  }

  /* Check */
  @Get('/:username')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('username') username: string) {
    return await this.userService.findOne(username);
  }

  // Todo: update user, delete user
}
