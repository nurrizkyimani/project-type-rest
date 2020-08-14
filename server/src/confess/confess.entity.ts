import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from 'src/user/users.entity';
import { CommentEntity } from 'src/comment/comment.entity';

@Entity('confes')
export class ConfessEntity {
	@PrimaryGeneratedColumn('uuid') confess_id: string;

	@CreateDateColumn() created: Date;

	@Column('text') title: string;

	@Column('text') desc: string;

	@Column('boolean') is_publish: boolean;

	@ManyToOne((type) => UserEntity, (author) => author.confes)
	author: UserEntity;

	@OneToMany((type) => CommentEntity, (comment) => comment.confess)
	comments: CommentEntity[];
}
