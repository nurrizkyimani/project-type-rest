import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConfessEntity } from 'src/confess/confess.entity';
import { CommentEntity } from 'src/comment/comment.entity';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	@CreateDateColumn() date: Date;

	@Column({
		unique: true,
		type: 'text'
	})
	username: string;

	@OneToMany((type) => ConfessEntity, (confes) => confes.author)
	confes: ConfessEntity[];

	@OneToMany((type) => CommentEntity, (comment) => comment.comment_id)
	comments: CommentEntity[];
}
