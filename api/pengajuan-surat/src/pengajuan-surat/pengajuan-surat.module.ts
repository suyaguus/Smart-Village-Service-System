import { Module } from '@nestjs/common';
import { PengajuanSuratService } from './pengajuan-surat.service';
import { PengajuanSuratController } from './pengajuan-surat.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PengajuanSuratController],
  providers: [PengajuanSuratService, PrismaService],
})
export class PengajuanSuratModule {}
