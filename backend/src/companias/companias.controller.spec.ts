import { Test, TestingModule } from '@nestjs/testing';
import { CompaniasController } from './companias.controller';

describe('CompaniasController', () => {
  let controller: CompaniasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniasController],
    }).compile();

    controller = module.get<CompaniasController>(CompaniasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
