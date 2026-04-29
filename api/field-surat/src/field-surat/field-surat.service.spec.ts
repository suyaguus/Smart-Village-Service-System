import { Test, TestingModule } from '@nestjs/testing';
import { FieldSuratService } from './field-surat.service';

describe('FieldSuratService', () => {
  let service: FieldSuratService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldSuratService],
    }).compile();

    service = module.get<FieldSuratService>(FieldSuratService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
