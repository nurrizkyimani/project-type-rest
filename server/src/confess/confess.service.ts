import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfessEntity } from './confess.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { confessDTO } from './confess.dto';

@Injectable()
export class ConfessService {
  constructor(
    @InjectRepository(ConfessEntity)
    private confessRepository: Repository<ConfessEntity>,
  ) {}

  async showAllConfess() {
    return this.confessRepository.find();
  }

  async createConfess(data: confessDTO) {
    const confess_one = await this.confessRepository.create(data);
    await this.confessRepository.save(confess_one);
    return confess_one;
  }

  async findOneConfess(id: string) {
    const confess_one = await this.confessRepository.findOne({ where: { id } });
    return confess_one;
  }

  async updateOneConfess(id: string, data: Partial<confessDTO>) {
    await this.confessRepository.update(id, data);
    return this.confessRepository.findOne(id);
  }
}
