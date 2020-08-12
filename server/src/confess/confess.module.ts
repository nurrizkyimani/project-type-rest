import { Module } from '@nestjs/common';
import { ConfessController } from './confess.controller';
import { ConfessService } from './confess.service';

@Module({
  controllers: [ConfessController],
  providers: [ConfessService]
})
export class ConfessModule {}
