import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PengaduanService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  // method create
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

  // method findAll
  async findAll() {
    // return `This action returns all pengaduan`;

    // ambil semua data pengaduan dari database
    const data = await this.prisma.pengaduan.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    // jika pengajuan surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Pengaduan tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }
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
