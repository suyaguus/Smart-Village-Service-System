import { Module } from '@nestjs/common';
import { PengaduanService } from './pengaduan.service';
import { PengaduanController } from './pengaduan.controller';

@Module({
  controllers: [PengaduanController],
  providers: [PengaduanService],
})
export class PengaduanModule {}
