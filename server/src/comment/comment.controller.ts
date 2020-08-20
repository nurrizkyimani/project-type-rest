import { Controller, Get, Post, Delete, Param, Logger, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { UserBuilder, user } from 'firebase-functions/lib/providers/auth';
import { User } from 'src/users/user.decorator';
import { commentDTO } from './comment.dto';
import { DataSnapshot } from 'firebase-functions/lib/providers/database';

@Controller('comment')
export class CommentController {
	constructor(private commentService: CommentService) {}

	@Get('confess/:id')
	showAllComment(@Param('id') confess: string) {
		this.commentService.showAllCommentPerConfessId(confess);
	}

	@Post('idea/id')
	createComment(@Param('id') confess: string, @User('id') user: string, @Body() data: commentDTO) {
		this.commentService.createComment(confess, user, data);
	}

	@Delete(':id')
	deleteComment(@Param('id') id: string, @User('id') user: string) {
		this.commentService.deleteComment(id, user);
	}
}
