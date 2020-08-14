import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfessService } from 'src/confess/confess.service';
import { CommentService } from 'src/comment/comment.service';
import { ConfessEntity } from 'src/confess/confess.entity';

@Module({
	imports: [ TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ UserEntity, ConfessEntity, UserEntity ]) ],
	providers: [ UserController ],
	controllers: [ UserService, ConfessService, CommentService ],
	exports: [ TypeOrmModule ]
})
export class UserModule {}
