import { Controller, Get, Post, Put, Delete, HostParam, Body, Param, Logger, UseGuards } from '@nestjs/common';
import { ConfessService } from './confess.service';
import { confessDTO } from './confess.dto';
import { AuthGuard } from 'shared/auth.guard';

@Controller('confess')
export class ConfessController {
	constructor(private confessService: ConfessService) {}

	@Get('confesstest')
	@UseGuards(new AuthGuard())
	async showUserTest() {
		return {
			status: true,
			desc: 'test is done'
		};
	}

	@Get()
	showAllConfess() {
		return this.confessService.showAllConfess();
	}

	@Get(':id')
	showEachConfess(@Param('id') id: string) {
		return this.confessService.findOneConfess(id);
	}

	@Post()
	createConfess(@Body() data: confessDTO) {
		return this.confessService.createConfess(data);
	}

	@Put(':id')
	updateConfess(@Param('id') id: string, @Body() data: Partial<confessDTO>) {
		return this.confessService.updateOneConfess(id, data);
	}

	@Delete(':id')
	deleteConfess(@Param('id') id: string) {
		// return this.confessService.
		Logger.log('TODO DELETE');
	}
}
