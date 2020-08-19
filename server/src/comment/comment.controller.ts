import { Controller, Get, Post, Delete, Param, Logger } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
	constructor(private commentService: CommentService) {}

	@Get()
	showAllComment() {
		this.commentService.showAllCommentPerConfessId;
	}

	@Post()
	createComment() {
		// this.commentService.createComment();
	}

	@Delete(':id')
	deleteComment(@Param('id') id: string) {
		Logger.log('to delete');
	}
}
