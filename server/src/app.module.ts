import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfessModule } from './confess/confess.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
@Module({
  imports: [
    UsersModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
