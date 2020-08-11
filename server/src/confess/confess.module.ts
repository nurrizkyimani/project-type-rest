import { Module } from '@nestjs/common';
import { ConfessController } from './confess.controller';

@Module({
  controllers: [ConfessController]
})
export class ConfessModule {}
