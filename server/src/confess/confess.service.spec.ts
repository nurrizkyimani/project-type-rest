import { Test, TestingModule } from '@nestjs/testing';
import { ConfessService } from './confess.service';

describe('ConfessService', () => {
  let service: ConfessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfessService],
    }).compile();

    service = module.get<ConfessService>(ConfessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
