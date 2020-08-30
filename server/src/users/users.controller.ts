import {
  Controller,
  Param,
  Get,
  Post,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as admin from 'firebase-admin';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async showUserbyId(@Param('id') uid: string) {
    const userident = await this.usersService.whoAmI(uid);
    console.log(userident);

    return { status: true, data: userident };
  }

  @Post(':id')
  showUserbyTest(@Param('id') username: string) {
    return `this is post ${username}`;
  }
}
