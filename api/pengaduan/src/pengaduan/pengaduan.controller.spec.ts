import { Test, TestingModule } from '@nestjs/testing';
import { PengaduanController } from './pengaduan.controller';
import { PengaduanService } from './pengaduan.service';

describe('PengaduanController', () => {
  let controller: PengaduanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PengaduanController],
      providers: [PengaduanService],
    }).compile();

    controller = module.get<PengaduanController>(PengaduanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
