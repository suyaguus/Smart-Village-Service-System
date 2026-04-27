import { Injectable } from '@nestjs/common';
import { CreateJenisSuratDto } from './dto/create-jenis-surat.dto';
import { UpdateJenisSuratDto } from './dto/update-jenis-surat.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JenisSuratService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}
  create(createJenisSuratDto: CreateJenisSuratDto) {
    return 'This action adds a new jenisSurat';
  }

  findAll() {
    return `This action returns all jenisSurat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jenisSurat`;
  }

  update(id: number, updateJenisSuratDto: UpdateJenisSuratDto) {
    return `This action updates a #${id} jenisSurat`;
  }

  remove(id: number) {
    return `This action removes a #${id} jenisSurat`;
  }
}
