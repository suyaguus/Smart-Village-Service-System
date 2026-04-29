import { Test, TestingModule } from '@nestjs/testing';
import { FieldSuratController } from './field-surat.controller';
import { FieldSuratService } from './field-surat.service';

describe('FieldSuratController', () => {
  let controller: FieldSuratController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldSuratController],
      providers: [FieldSuratService],
    }).compile();

    controller = module.get<FieldSuratController>(FieldSuratController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
