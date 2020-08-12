import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/users.entity';
import { CommentEntity } from 'src/comment/comment.entity';

@Entity('confes')
export class ConfessEntity {
  @PrimaryGeneratedColumn('uuid')
  confess_id: string;

  @Column('title')
  title: string;

  @Column('desc')
  desc: string;

  @CreateDateColumn()
  created: Date;

  @Column('is_publish')
  is_publish: boolean;

  @ManyToOne(
    type => UserEntity,
    user => user.confes,
  )
  user: UserEntity;

  @OneToMany(
    type => CommentEntity,
    comment => comment.comment_id,
  )
  comments: CommentEntity[];
}
