import { Module } from '@nestjs/common';
import { ConfessController } from './confess.controller';
import { ConfessService } from './confess.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfessEntity } from './confess.entity';
import { UserService } from 'src/user/user.service';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/user/users.entity';

@Module({
	imports: [ TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ ConfessEntity, CommentEntity, UserEntity ]) ],
	controllers: [ ConfessController ],
	providers: [ ConfessService, UserService, ConfessService ],
	exports: [ TypeOrmModule ]
})
export class ConfessModule {}
