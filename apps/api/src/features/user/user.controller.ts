import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { GetUser } from 'src/lib/decorators/user.decorator';
import { UserFindAllMode } from './types';
import { UpdateUserDto } from './dtos';

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

  /* frontend implementation required */
  @UseGuards(AuthGuard('access'))
  @Put('/me')
  @HttpCode(HttpStatus.OK)
  async updateMe(
    @GetUser('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateMe(userId, updateUserDto);
    return { message: '사용자 업데이트 성공' };
  }

  @UseGuards(AuthGuard('access'))
  @Delete('/me')
  @HttpCode(HttpStatus.OK)
  async deleteMe(@GetUser('id') userId: number) {
    await this.userService.deleteMe(userId);
    return { message: '사용자 삭제 성공' };
  }
}
