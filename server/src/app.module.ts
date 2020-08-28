import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfessModule } from './confess/confess.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

import 'dotenv/config';
import { ConfessController } from './confess/confess.controller';
import { CommentController } from './comment/comment.controller';
import { ConfessService } from './confess/confess.service';
import { ConfessEntity } from './confess/confess.entity';
import { CommentEntity } from './comment/comment.entity';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserEntity } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UsersModule,
    ConfessModule,
    CommentModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    CommentController,
    UsersController,
    ConfessController,
  ],
  providers: [AppService, CommentService, UsersService, ConfessService],
  exports: [UsersModule, ConfessModule, CommentModule],
})
export class AppModule {}
