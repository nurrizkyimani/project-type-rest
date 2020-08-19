import { Injectable, Logger, Inject } from '@nestjs/common';
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
		return this.commentRepository.findOne({ where: { author: { id: confessid } } });
	}

	async createComment(confessId: string, userId: string, data: commentDTO) {
		const confess = this.confessRepository.findOne({ where: { confess_id: confessId } });
		const user = this.userRepository.findOne({ where: { id: userId } });
	}

	async deleteComment(id: string, userId: string) {
		Logger.log('delete comment');
	}
}
