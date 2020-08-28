import { Controller, Param, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async showUserbyId(
    @Param('id')
    uid: string,

    // @Res() res: Response,
  ) {
    const userident = await this.usersService.whoAmI(uid);

    console.log('this is user ', userident);
    return `this is ${userident}`;
  }

  @Post(':id')
  showUserbyTest(
    @Param('id')
    username: string,
  ) {
    return `this is post ${username}`;
  }
}
