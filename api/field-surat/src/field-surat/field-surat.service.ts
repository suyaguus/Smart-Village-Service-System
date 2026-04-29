import { Injectable } from '@nestjs/common';
import { CreateFieldSuratDto } from './dto/create-field-surat.dto';
import { UpdateFieldSuratDto } from './dto/update-field-surat.dto';

@Injectable()
export class FieldSuratService {
  create(createFieldSuratDto: CreateFieldSuratDto) {
    return 'This action adds a new fieldSurat';
  }

  findAll() {
    return `This action returns all fieldSurat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldSurat`;
  }

  update(id: number, updateFieldSuratDto: UpdateFieldSuratDto) {
    return `This action updates a #${id} fieldSurat`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldSurat`;
  }
}
