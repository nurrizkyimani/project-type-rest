import {
	Controller,
	Param,
	Get,
	Post,
	Res,
	UseInterceptors,
	ClassSerializerInterceptor,
	UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as admin from 'firebase-admin';
import { UserDTO } from './users.dto';
import { AuthGuard } from 'shared/auth.guard';

@Controller('users')
@UseGuards(new AuthGuard())
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('usertest')
	async showUserTest() {
		return {
			status: true
		};
	}

	@Get(':id')
	async showUserbyId(@Param('id') uid: string) {
		const userident = await this.usersService.whoAmI(uid);
		console.log(userident);

		return { status: true, data: userident };
	}
}
