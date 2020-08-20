import { Injectable, Logger, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { commentDTO } from './comment.dto';
import { UserEntity } from 'src/users/users.entity';
import { ConfessEntity } from 'src/confess/confess.entity';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
		@InjectRepository(ConfessEntity) private confessRepository: Repository<ConfessEntity>
	) {}

	showAllCommentPerConfessId(confessid: String) {
		return this.commentRepository.findOne({
			where: { author: { id: confessid } }
		});
	}

	async createComment(confessId: string, userId: string, data: commentDTO) {
		const confess = await this.confessRepository.findOne({ where: { id: confessId } });
		const user = await this.userRepository.findOne({ where: { id: userId } });

		const comment = await this.commentRepository.create({
			...data,
			confess,
			author: user
		});
		await this.commentRepository.save(comment);
		return this.toResponseObject(comment);
	}

	async deleteComment(id: string, userId: string) {
		Logger.log('delete comment');
	}

	private toResponseObject(comment: CommentEntity) {
		return {
			...comment
			// author: comment.author && comment.author.toResponseObject()
		};
	}

	async destroy(id: string, userId: string) {
		const comment = await this.commentRepository.findOne({
			where: { id },
			relations: [ 'author', 'idea' ]
		});

		if (comment.author.id !== userId) {
			throw new HttpException('You do not own this comment', 500);
		}

		await this.commentRepository.remove(comment);
		return this.toResponseObject(comment);
	}
}
