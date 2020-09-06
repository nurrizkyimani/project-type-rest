import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { ConfessService } from 'src/confess/confess.service';
import { ConfessEntity } from 'src/confess/confess.entity';
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
	imports: [ TypeOrmModule.forFeature([ CommentEntity, ConfessEntity, UserEntity ]) ],
	providers: [ CommentService, UsersService ],
	controllers: [ CommentController ],
	exports: [ TypeOrmModule ]
})
export class CommentModule {}
