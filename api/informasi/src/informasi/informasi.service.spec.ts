import { Test, TestingModule } from '@nestjs/testing';
import { InformasiService } from './informasi.service';

describe('InformasiService', () => {
  let service: InformasiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformasiService],
    }).compile();

    service = module.get<InformasiService>(InformasiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
