import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }
}
