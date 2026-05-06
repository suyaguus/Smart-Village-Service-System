import { Test, TestingModule } from '@nestjs/testing';
import { InformasiController } from './informasi.controller';
import { InformasiService } from './informasi.service';

describe('InformasiController', () => {
  let controller: InformasiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformasiController],
      providers: [InformasiService],
    }).compile();

    controller = module.get<InformasiController>(InformasiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
