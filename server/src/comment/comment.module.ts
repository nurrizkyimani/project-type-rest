import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { UserService } from 'src/user/user.service';
import { ConfessService } from 'src/confess/confess.service';
import { ConfessEntity } from 'src/confess/confess.entity';
import { UserEntity } from 'src/user/users.entity';

@Module({
	imports: [ TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ CommentEntity, ConfessEntity, UserEntity ]) ],
	providers: [ CommentService, UserService, ConfessService ],
	controllers: [ CommentController ],
	exports: [ TypeOrmModule ]
})
export class CommentModule {}
