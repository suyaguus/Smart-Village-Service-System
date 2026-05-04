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

    // response jika data berhasil ditemukan
    return {
      success: true,
      message: 'Pengaduan berhasil ditemukan.',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
    };
  }

  // method findByUser untuk mencari pengaduan berdasarkan user_id
  async findByUser(user_id: string) {
    // ambil data pengaduan berdasarkan user_id dari database
    const data = await this.prisma.pengaduan.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
    });

    // jika pengaduan tidak ditemukan, maka throw exception
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

    // response jika data berhasil ditemukan
    return {
      success: true,
      message: 'Pengaduan berhasil ditemukan.',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  // method findOne
  async findOne(id: number) {
    // return `This action returns a #${id} pengaduan`;

    // menggunakan try catch
    try {
      // ambil data pengaduan berdasarkan id dari database
      const data = await this.prisma.pengaduan.findUnique({
        where: { id },
        include: {
          respon: {
            orderBy: {
              created_at: 'asc',
            },
          },
        },
      });

      // jika data pengaduan tidak ditemukan, maka throw exception
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Pengaduan tidak ditemukan!',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // jika data ditemukan, maka tampilkan respon dan data pengaduan
      return {
        success: true,
        message: 'Pengaduan berhasil ditemukan.',
        metadata: {
          status: HttpStatus.OK,
        },
        data,
      };
    } catch (error) {
      // jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;
    }
  }

  update(id: number, updatePengaduanDto: UpdatePengaduanDto) {
    return `This action updates a #${id} pengaduan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pengaduan`;
  }
}
