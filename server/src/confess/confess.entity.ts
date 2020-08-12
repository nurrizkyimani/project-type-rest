import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/user/users.entity';

@Entity('confes')
export class ConfessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
