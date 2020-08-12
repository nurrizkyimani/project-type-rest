import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfessEntity } from './confess.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConfessService {
  constructor(
    @InjectRepository(ConfessEntity)
    private confessRepository: Repository<ConfessEntity>,
  ) {}

  async showAll() {
    return this.confessRepository.find();
  }

  async create(data) {
    const confess_one = await this.confessRepository.create(data);
    await this.confessRepository.save(confess_one);
    return confess_one;
  }

  async findOne(id: string) {
    const confess_one = await this.confessRepository.findOne({ where: { id } });
    return confess_one;
  }

  async updateOne(id: string, data) {
    await this.confessRepository.update(id, data);
    return this.confessRepository.findOne(id);
  }
}
