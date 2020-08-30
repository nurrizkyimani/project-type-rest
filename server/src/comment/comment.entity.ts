import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinTable } from 'typeorm';
import { UserEntity } from 'src/users/users.entity';
import { ConfessEntity } from 'src/confess/confess.entity';
@Entity('comment')
export class CommentEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	@CreateDateColumn() created: Date;

	@Column('text') comment: string;

	@Column('text') uid: string;

	@ManyToOne((type) => ConfessEntity, (confess) => confess.comments)
	confess: ConfessEntity;
}
