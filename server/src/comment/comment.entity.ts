import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/user/users.entity';
import { ConfessEntity } from 'src/confess/confess.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  comment_id: string;

  @Column('comment')
  comment_each: string;

  @ManyToOne(
    type => UserEntity,
    user => user.comments,
  )
  user: UserEntity;

  @ManyToOne(
    type => ConfessEntity,
    confess => confess.confess_id,
  )
  confess: ConfessEntity;
}
