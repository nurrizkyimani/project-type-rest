import { Test, TestingModule } from '@nestjs/testing';
import { ConfessController } from './confess.controller';

describe('Confess Controller', () => {
  let controller: ConfessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfessController],
    }).compile();

    controller = module.get<ConfessController>(ConfessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
