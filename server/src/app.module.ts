import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfessModule } from './confess/confess.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import 'dotenv/config';
import { ConfessController } from './confess/confess.controller';
import { CommentController } from './comment/comment.controller';
import { ConfessService } from './confess/confess.service';
@Module({
  imports: [
    UserModule,
    ConfessModule,
    CommentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: `${process.env.DATABASE_URI}`,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: true,

      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [
    AppController,
    CommentController,
    UserController,
    ConfessController,
  ],
  providers: [AppService, CommentService, UserService, ConfessService],
})
export class AppModule {}
