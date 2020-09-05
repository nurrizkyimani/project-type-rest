import { Injectable, Logger, Inject, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
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
		@InjectRepository(ConfessEntity) private confessRepository: Repository<ConfessEntity>
	) {}

	async show(id: string) {
		const comment = await this.commentRepository.findOne({
			where: { id },
			relations: [ 'confess' ]
		});

		return this.toResponseObject(comment);
	}

	async showCommentByConfess(confessid: string) {
		const idea = await this.confessRepository.findOne({
			where: { confess_id: confessid },
			relations: [ 'comments', 'comments.confess' ]
		});

		return idea.comments;
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

	async deleteComment(id: string, userId: string) {
		try {
			const comment = await this.commentRepository.findOne({
				where: { id },
				relations: [ 'confess' ]
			});

			if (comment.userid != userId) {
				throw new HttpException('comment with not your id ', HttpStatus.UNAUTHORIZED);
			}

			await this.commentRepository.remove(comment);
			return comment;
		} catch (error) {
			console.log(error);
			return error;
		}
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

		if (comment.userid !== userId) {
			throw new HttpException('You do not own this comment', 500);
		}

		await this.commentRepository.remove(comment);
		return this.toResponseObject(comment);
	}
}
