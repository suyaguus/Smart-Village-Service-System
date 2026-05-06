import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    // jika data kosong, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Infomasi tidak ditemukan.',
        metadata: {
          status: HttpStatus.NOT_FOUND,
        },
      });
    }
  }

  // method findOne
  async findOne(id: number) {
    // return `This action returns a #${id} informasi`;

    // menggunakan try catch
    try {

      // cek apakah informasi dengan id tersebut ada di database
      const data = await this.prisma.informasi.findUnique({
        where: { id}
      })

      // jika data tidak ditemukan, maka throw exception
      if(!data) {
        throw new NotFoundException({
          success: false,
          message: 'Informasi tidak ditemukan.',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          }
        })
      }

      // jika data ditemukan, maka tampilkan respon dan data informasi
      return {
        success: false,
        message: 'Informasi berhasil ditemukan.',
        metadata: {
          status: HttpStatus.OK,
        }
      }
    }
  }

  update(id: number, updateInformasiDto: UpdateInformasiDto) {
    return `This action updates a #${id} informasi`;
  }

  remove(id: number) {
    return `This action removes a #${id} informasi`;
  }
}
