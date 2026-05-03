import { Injectable } from '@nestjs/common';
import { CreatePengajuanSuratDto } from './dto/create-pengajuan-surat.dto';
import { UpdateStatusDto } from './dto/update-pengajuan-surat.dto';
import { StatusPengajuan } from 'src/generated/prisma/browser';
import { PrismaService } from 'src/prisma.service';

// buat constant untuk status transitions
const STATUS_TRANSITIONS: Record<StatusPengajuan, StatusPengajuan[]> = {
  MENUNGGU: [StatusPengajuan.DIPROSES],
  DIPROSES: [StatusPengajuan.SELESAI, StatusPengajuan.DITOLAK],
  DITOLAK: [],
  SELESAI: [],
};

@Injectable()
export class PengajuanSuratService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  // method create
  async create(createPengajuanSuratDto: CreatePengajuanSuratDto) {
    // return 'This action adds a new pengajuanSurat';

    // membuat constanta untuk memisahkan data pengajuan dengan detail dan dokumen
    const { detail, dokumen, ...pengajuanData } = createPengajuanSuratDto;
  }

  findAll() {
    return `This action returns all pengajuanSurat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pengajuanSurat`;
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return `This action updates a #${id} pengajuanSurat`;
  }

  remove(id: number) {
    return `This action removes a #${id} pengajuanSurat`;
  }
}
