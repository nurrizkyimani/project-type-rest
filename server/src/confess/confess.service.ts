import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfessEntity } from './confess.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { confessDTO } from './confess.dto';
import { CommentEntity } from 'src/comment/comment.entity';

@Injectable()
export class ConfessService {
  constructor(
    @InjectRepository(ConfessEntity)
    private confessRepository: Repository<ConfessEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async showAllConfess(page: number) {
    return await this.confessRepository.find({
      // relations: ['comments'],
      take: 10,
      skip: 1 * (page - 1),
    });
  }

  async showAllWithRelation() {
    return await this.confessRepository.find({ relations: ['comments'] });
  }

  async createConfess(data: confessDTO) {
    const confess_one = await this.confessRepository.create(data);
    await this.confessRepository.save(confess_one);
    return confess_one;
  }

  async findOneConfess(id: string) {
    const confess_one = await this.confessRepository.findOne({
      where: { confess_id: id },
    });
    return confess_one;
  }

  async updateOneConfess(id: string, data: Partial<confessDTO>) {
    await this.confessRepository.update(id, data);
    return this.confessRepository.findOne(id);
  }
}
