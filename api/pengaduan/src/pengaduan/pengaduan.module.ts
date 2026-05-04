import { Module } from '@nestjs/common';
import { PengaduanService } from './pengaduan.service';
import { PengaduanController } from './pengaduan.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PengaduanController],
  providers: [PengaduanService, PrismaService],
})
export class PengaduanModule {}
