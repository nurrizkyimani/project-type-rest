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
import { databaseProviders } from './database.providers';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		// TypeOrmModule.forRoot({
		// 	type: 'postgres',
		// 	// url: `postgres://pdzobfdljfjsqj:72e6f410ea7c81e16b28e21d0fd56200400b681d1f2a549d1bfd2145010a2f25@ec2-54-236-169-55.compute-1.amazonaws.com:5432/d54e24h4bcaom0`,

		// 	host: `ec2-54-236-169-55.compute-1.amazonaws.com`,
		// 	username: `pdzobfdljfjsqj`,
		// 	password: `72e6f410ea7c81e16b28e21d0fd56200400b681d1f2a549d1bfd2145010a2f25`,
		// 	database: `d54e24h4bcaom0`,
		// 	port: 5432,
		// 	// entities: [ 'dist/**/*.entity{.ts,.js}' ],
		// entities: [ 'dist/**/*.entity{.ts,.js}' ],
		// 	// url: `${process.env.DATABASE_URI}`,
		// 	entities: [ UserEntity, ConfessEntity, CommentEntity ],
		// 	synchronize: true,
		// 	// ssl: true
		// extra: {
		// 	ssl: {
		// 		rejectUnauthorized: false
		// 	}
		// }
		// 	// dropSchema: true
		// }),
		UsersModule,
		ConfessModule,
		CommentModule,
		UsersModule
	],
	controllers: [ AppController, CommentController, UsersController, ConfessController ],
	providers: [
		AppService,
		CommentService,
		UsersService,
		ConfessService
		// ...databaseProviders
	],
	exports: [
		// UsersModule, ConfessModule, CommentModule
		// ...databaseProviders
	]
})
export class AppModule {}
