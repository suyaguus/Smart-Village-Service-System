import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateInformasiDto } from './dto/create-informasi.dto';
import { UpdateInformasiDto } from './dto/update-informasi.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InformasiService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  // method create
  async create(createInformasiDto: CreateInformasiDto) {
    // return 'This action adds a new informasi';

    // simpan data informasi baru ke database
    await this.prisma.informasi.create({
      data: createInformasiDto,
    });

    // response jika data berhasil disimpan
    return {
      success: true,
      message: 'Informasi berhasil dibuat.',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // method findAll
  async findAll() {
    // return `This action returns all informasi`;

    // ambil semua data informasi dari database
    const data = await this.prisma.informasi.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
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
