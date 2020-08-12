import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ConfessEntity } from 'src/confess/confess.entity';
import { CommentEntity } from 'src/comment/comment.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column('name')
  name: string;

  @OneToMany(
    type => ConfessEntity,
    confes => confes.user,
  )
  confes: ConfessEntity[];

  @OneToMany(
    type => CommentEntity,
    comment => comment.comment_id,
  )
  comments: CommentEntity[];
}
