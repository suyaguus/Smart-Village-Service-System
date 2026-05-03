import { Injectable } from '@nestjs/common';
import { CreatePengajuanSuratDto } from './dto/create-pengajuan-surat.dto';
import { UpdatePengajuanSuratDto } from './dto/update-pengajuan-surat.dto';

@Injectable()
export class PengajuanSuratService {
  create(createPengajuanSuratDto: CreatePengajuanSuratDto) {
    return 'This action adds a new pengajuanSurat';
  }

  findAll() {
    return `This action returns all pengajuanSurat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pengajuanSurat`;
  }

  update(id: number, updatePengajuanSuratDto: UpdatePengajuanSuratDto) {
    return `This action updates a #${id} pengajuanSurat`;
  }

  remove(id: number) {
    return `This action removes a #${id} pengajuanSurat`;
  }
}
