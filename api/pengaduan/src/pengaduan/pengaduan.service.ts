import { Injectable } from '@nestjs/common';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';
import { UpdatePengaduanDto } from './dto/update-pengaduan.dto';

@Injectable()
export class PengaduanService {
  create(createPengaduanDto: CreatePengaduanDto) {
    return 'This action adds a new pengaduan';
  }

  findAll() {
    return `This action returns all pengaduan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pengaduan`;
  }

  update(id: number, updatePengaduanDto: UpdatePengaduanDto) {
    return `This action updates a #${id} pengaduan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pengaduan`;
  }
}
