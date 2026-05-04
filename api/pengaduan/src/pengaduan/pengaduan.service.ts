import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PengaduanService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}
  async create(createPengaduanDto: CreatePengaduanDto) {
    // return 'This action adds a new pengaduan';

    // simpan data pengaduan baru ke database
    await this.prisma.pengaduan.create({
      data: createPengaduanDto,
    });

    // response jika data berhasil disimpan
    return {
      success: true,
      message: 'Pengaduan berhasil dibuat.',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
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
