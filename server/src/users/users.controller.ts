import { Controller, Param, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  showUserbyId(
    @Param('id')
    uid: string,
  ) {
    return this.usersService.whoAmI(uid);
  }

  @Post(':id')
  showUserbyTest(
    @Param('id')
    username: string,
  ) {
    return `this is post ${username}`;
  }
}
