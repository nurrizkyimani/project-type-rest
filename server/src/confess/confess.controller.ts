import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HostParam,
  Body,
  Param,
  Logger,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ConfessService } from './confess.service';
import { confessDTO } from './confess.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('confess')
export class ConfessController {
  constructor(private confessService: ConfessService) {}

  @Get('confesstest')
  @UseGuards(new AuthGuard())
  async showUserTest() {
    return {
      status: true,
      desc: 'test is done',
    };
  }

  @Post('/createtest')
  @UsePipes(new ValidationPipe())
  createTestConfess(@Body() data: confessDTO) {
    return `this is ${data}`;
  }

  @Get()
  showAllConfess() {
    return this.confessService.showAllConfess();
  }

  @Get('showrelation')
  showAllWithRelation() {
    return this.confessService.showAllWithRelation();
  }

  @Get(':id')
  showEachConfess(@Param('id') id: string) {
    return this.confessService.findOneConfess(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createConfess(@Body() data: confessDTO) {
    return this.confessService.createConfess(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateConfess(@Param('id') id: string, @Body() data: Partial<confessDTO>) {
    return this.confessService.updateOneConfess(id, data);
  }

  @Delete(':id')
  deleteConfess(@Param('id') id: string) {
    // return this.confessService.
    Logger.log('TODO DELETE');
  }
}
