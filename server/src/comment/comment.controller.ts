import { Controller, Get, Post, Delete, Param, Logger, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { UserBuilder, user } from 'firebase-functions/lib/providers/auth';
import { User } from 'src/users/user.decorator';
import { commentDTO } from './comment.dto';
import { DataSnapshot } from 'firebase-functions/lib/providers/database';

@Controller('api/comments')
export class CommentController {
	constructor(private commentService: CommentService) {}

	// @Get('all')

	@Get('confess/:id')
	showCommentByConfess(@Param('id') confess: string) {
		return this.commentService.showCommentByConfess(confess);
	}

	@Post('confess/:id')
	createComment(@Param('id') confess: string, @Body() data: commentDTO) {
		return this.commentService.createComment(confess, data);
	}

	@Delete(':id')
	deleteComment(@Param('id') id: string, @User('id') user: string) {
		return this.commentService.deleteComment(id, user);
	}
}
