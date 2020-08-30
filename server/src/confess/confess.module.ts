import { Module } from '@nestjs/common';
import { ConfessController } from './confess.controller';
import { ConfessService } from './confess.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfessEntity } from './confess.entity';

import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([ConfessEntity, CommentEntity, UserEntity]),
  ],
  controllers: [ConfessController],
  providers: [ConfessService, UsersService, ConfessService, UserEntity],
  exports: [TypeOrmModule],
})
export class ConfessModule {}
