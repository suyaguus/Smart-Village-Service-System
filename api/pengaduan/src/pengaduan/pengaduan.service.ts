import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateStatusDto } from './dto/update-pengaduan.dto';
import { CreateResponDto } from './dto/create-respon.dto';
import {
  PENGADUAN_LIST_SELECT,
  PENGADUAN_SELECT,
} from 'src/common/constants/select';
import { notExistPengaduan } from 'src/common/utils/not-exist.util';

// definisikan status pengaduan
const STATUS_TRANSITIONS: Record<string, string[]> = {
  MENUNGGU: ['DIPROSES'],
  DIPROSES: ['SELESAI'],
  SELESAI: [],
};

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
      // message: 'Pengaduan berhasil dibuat.',
      // refactor message response
      message: process.env.SUCCESS_SAVE_MESSAGE,
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
      // refactor: menambahkan select field
      select: PENGADUAN_LIST_SELECT,
      orderBy: {
        created_at: 'desc',
      },
    });

    // jika pengajuan surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        // message: 'Pengaduan tidak ditemukan!',
        // refactor message response
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // response jika data berhasil ditemukan
    return {
      success: true,
      // message: 'Pengaduan berhasil ditemukan.',
      // refactor message response
      message: process.env.SUCCESS_FIND_MESSAGE,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  // method findByUser untuk mencari pengaduan berdasarkan user_id
  async findByUser(user_id: string) {
    // ambil data pengaduan berdasarkan user_id dari database
    const data = await this.prisma.pengaduan.findMany({
      where: { user_id },
      // refactor: menambahkan select field
      select: PENGADUAN_LIST_SELECT,
      orderBy: { created_at: 'desc' },
    });

    // jika pengaduan tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        // message: 'Pengaduan tidak ditemukan!',
        // refactor message response
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // response jika data berhasil ditemukan
    return {
      success: true,
      // message: 'Pengaduan berhasil ditemukan.',
      // refactor message response
      message: process.env.SUCCESS_FIND_MESSAGE,
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
      // refactor: menggunakan notExistPengaduan
      await notExistPengaduan(
        id,
        this.prisma.pengaduan,
        process.env.NOT_FOUND_MESSAGE ?? '',
      );

      // ambil data pengaduan berdasarkan id dari database
      const data = await this.prisma.pengaduan.findUnique({
        where: { id },
        select: PENGADUAN_SELECT,
      });

      // jika data pengaduan tidak ditemukan, maka throw exception
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: 'Pengaduan tidak ditemukan!',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // jika data ditemukan, maka tampilkan respon dan data pengaduan
      return {
        success: true,
        // message: 'Pengaduan berhasil ditemukan.',
        // refactor message response
        message: process.env.SUCCESS_FIND_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
        data,
      };
    } catch (error) {
      // jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;

      // jika error yang terjadi bukan NotFoundException, maka throw BadRequestException
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid!',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method updateStatus untuk update status pengaduan
  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    // return `This action updates a #${id} pengaduan`;

    // menggunakan try catch
    try {
      // ambil status pengaduan berdasarkan id dari database
      const current = await this.prisma.pengaduan.findUnique({ where: { id } });

      // jika data pengaduan tidak ditemukan, maka throw exception
      if (!current) {
        throw new NotFoundException({
          success: false,
          message: 'Pengaduan tidak ditemukan!',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // validasi perubahan status berdasarkan STATUS_TRANSITIONS
      const allowed = STATUS_TRANSITIONS[current.status];
      if (!allowed.includes(updateStatusDto.status)) {
        throw new BadRequestException({
          success: false,
          message: 'Perubahan status tidak valid!',
          metadata: {
            status: HttpStatus.BAD_REQUEST,
          },
        });
      }

      // update status pengaduan di database
      await this.prisma.pengaduan.update({
        where: { id },
        data: {
          status: updateStatusDto.status,
        },
      });

      // response jika status berhasil diupdate
      return {
        success: true,
        message: 'Status pengaduan berhasil diupdate.',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // jika error yang terjadi adalah NotFoundException atau BadRequestException, maka throw error tersebut
      if (error instanceof HttpException) throw error;

      // jika error yang terjadi bukan NotFoundException atau BadRequestException, maka throw BadRequestException
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid!',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method remove
  async remove(id: number) {
    // return `This action removes a #${id} pengaduan`;

    // menggunakan try catch
    try {
      // cek apakah data pengaduan dengan id tersebut ada di database
      const data = await this.prisma.pengaduan.findUnique({ where: { id } });

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

      // jika data ditemukan, maka hapus data pengaduan berdasarkan id dari database
      await this.prisma.pengaduan.delete({ where: { id } });

      // response jika data berhasil dihapus
      return {
        success: true,
        message: 'Pengaduan berhasil dihapus.',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;

      // jika error yang terjadi bukan NotFoundException, maka throw BadRequestException
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid!',
        metadata: { status: HttpStatus.BAD_REQUEST },
      });
    }
  }

  // method createRespon
  async createRespon(id: number, createResponDto: CreateResponDto) {
    // menggunakan try catch
    try {
      // cek apakah data pengaduan dengan id tersebut ada di database
      const pengaduan = await this.prisma.pengaduan.findUnique({
        where: { id },
      });

      // jika data pengaduan tidak ditemukan, maka throw exception
      if (!pengaduan) {
        throw new NotFoundException({
          success: false,
          message: 'Pengaduan tidak ditemukan!',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // jika data ditemukan, maka simpan data respon ke database
      await this.prisma.pengaduanRespon.create({
        data: {
          pengaduan_id: id,
          admin_id: createResponDto.admin_id,
          text: createResponDto.text,
        },
      });

      // response jika data respon berhasil disimpan
      return {
        success: true,
        message: 'Respon berhasil dikirim.',
        metadata: {
          status: HttpStatus.CREATED,
        },
      };
    } catch (error) {
      // jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof HttpException) throw error;

      // jika error yang terjadi bukan NotFoundException, maka throw BadRequestException
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid!',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
