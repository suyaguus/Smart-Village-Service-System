import { Injectable } from '@nestjs/common';
import { CreateInformasiDto } from './dto/create-informasi.dto';
import { UpdateInformasiDto } from './dto/update-informasi.dto';

@Injectable()
export class InformasiService {
  create(createInformasiDto: CreateInformasiDto) {
    return 'This action adds a new informasi';
  }

  findAll() {
    return `This action returns all informasi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informasi`;
  }

  update(id: number, updateInformasiDto: UpdateInformasiDto) {
    return `This action updates a #${id} informasi`;
  }

  remove(id: number) {
    return `This action removes a #${id} informasi`;
  }
}
