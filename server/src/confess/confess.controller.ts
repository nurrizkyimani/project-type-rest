import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ConfessService } from './confess.service';

@Controller('confess')
export class ConfessController {
  constructor(private confessService: ConfessService) {}

  @Get()
  showAllConfess() {}

  @Get(':id')
  showEachConfess() {}

  @Post()
  createConfess() {}

  @Put(':id')
  updateConfess() {}

  @Delete(':id')
  deleteConfess() {}
}
