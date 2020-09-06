import { Injectable, Logger, Inject, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { commentDTO } from './comment.dto';
import { UserEntity } from 'src/users/users.entity';
import { ConfessEntity } from 'src/confess/confess.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
		@InjectRepository(ConfessEntity) private confessRepository: Repository<ConfessEntity>,
		private usersservice: UsersService
	) {}

	async showCommentByConfessAndUser(uid: string) {
		const confess = await this.confessRepository.findOne({
			where: { userid: uid },
			relations: [ 'comments' ]
		});

		const user = await this.usersservice.whoAmI(uid);

		return {
			user,
			confess
		};
	}

	async show(id: string) {
		// kalau cuma confess aja ga pakai "confess.comment" di confess object ga ada "comments".
		// 	{
		//   "id": "4b1bba28-59d5-4e1c-8a97-9797d9ecd304",
		//   "created": "2020-09-05T10:11:49.054Z",
		//   "comment": "comment1",
		//   "userid": "eFJBsTnzoscoVoZz5iW4bi60jmo1",
		//   "confess": {
		//       "confess_id": "93a4ec14-05c3-440d-9fb2-11eaf1c41996",
		//       "created": "2020-09-05T07:19:45.183Z",
		//       "title": "sfsdfsf",
		//       "desc": "desfadsfasdf",
		//       "is_publish": true,
		//       "userid": "eFJBsTnzoscoVoZz5iW4bi60jmo1"
		//   }
		// }
		const comment = await this.commentRepository.findOne({
			where: { id },
			relations: [ 'confess' ]
		});

		return this.toResponseObject(comment);
	}

	async showCommentByConfess(confessid: string) {
		const confess = await this.confessRepository.findOne({
			where: { confess_id: confessid },
			relations: [ 'comments', 'comments.confess' ]
		});

		return confess.comments;
	}

	async createComment(confess_id: string, data: commentDTO) {
		try {
			const confess = await this.confessRepository.findOne({
				where: { confess_id }
			});
			const commentCreate = await this.commentRepository.create({
				...data,
				confess
			});
			await this.commentRepository.save(commentCreate);
			return commentCreate;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async deleteComment(
		id: string
		// , userId: string
	) {
		try {
			const comment = await this.commentRepository.findOne({
				where: { id },
				relations: [ 'confess' ]
			});

			// if (comment.userid != userId) {
			// 	throw new HttpException('comment with not your id ', HttpStatus.UNAUTHORIZED);
			// }

			await this.commentRepository.remove(comment);
			return comment;
		} catch (error) {
			console.log(error);
			// return error;
			throw new HttpException('Not Found ', HttpStatus.NOT_FOUND);
		}
	}

	private toResponseObject(comment: CommentEntity) {
		return {
			...comment
			// author: comment.author && comment.author.toResponseObject()
		};
	}

	async destroy(
		id: string
		// userId: string
	) {
		const comment = await this.commentRepository.findOne({
			where: { id },
			relations: [ 'author', 'idea' ]
		});

		// if (comment.userid !== userId) {
		// 	throw new HttpException('You do not own this comment', 500);
		// }

		await this.commentRepository.remove(comment);
		return this.toResponseObject(comment);
	}
}
