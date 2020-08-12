import { Module } from '@nestjs/common';
import { ConfessController } from './confess.controller';
import { ConfessService } from './confess.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfessEntity } from './confess.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfessEntity])],
  controllers: [ConfessController],
  providers: [ConfessService],
})
export class ConfessModule {}
