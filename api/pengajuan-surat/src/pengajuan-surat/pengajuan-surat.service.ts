import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePengajuanSuratDto } from './dto/create-pengajuan-surat.dto';
import { UpdateStatusDto } from './dto/update-pengajuan-surat.dto';
import { PrismaService } from 'src/prisma.service';
import { PENGAJUAN_SURAT_LIST_SELECT } from 'src/common/constants/select';

@Injectable()
export class PengajuanSuratService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  // method create
  async create(createPengajuanSuratDto: CreatePengajuanSuratDto) {
    // return 'This action adds a new pengajuanSurat';

    // membuat constanta untuk memisahkan data pengajuan dengan detail dan dokumen
    const { detail, dokumen, ...pengajuanData } = createPengajuanSuratDto;

    // simpan data pengajuan surat beserta detail dan dokumen ke database
    await this.prisma.pengajuanSurat.create({
      data: {
        ...pengajuanData,
        detail: {
          create: detail,
        },
        dokumen: {
          create: dokumen ?? [],
        },
      },
    });

    // response jika data berhasil disimpan
    return {
      success: true,
      // message: 'Pengajuan Surat berhasil dibuat.',
      // refactor message response
      message: process.env.SUCCESS_SAVE_MESSAGE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // method findAll
  async findAll() {
    // return `This action returns all pengajuanSurat`;

    // ambil semua data pengajuan surat dari database
    const data = await this.prisma.pengajuanSurat.findMany({
      select: PENGAJUAN_SURAT_LIST_SELECT,
      orderBy: {
        created_at: 'desc',
      },
    });

    // jika pengajuan surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        // message: 'Pengajuan Surat tidak ditemukan!',
        // refactor message response
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data pengajuan surat
    return {
      success: true,
      // message: 'Pengajuan Surat berhasil ditemukan.',
      // refactor message response
      message: process.env.SUCCESS_FIND_MESSAGE,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  // method findByUser
  async findByUser(user_id: string) {
    // ambil data pengajuan surat berdasarkan user id dari database
    const data = await this.prisma.pengajuanSurat.findMany({
      where: { user_id },
      select: PENGAJUAN_SURAT_LIST_SELECT,
      orderBy: { created_at: 'desc' },
    });

    // jika pengajuan surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        // message: 'Pengajuan surat tidak ditemukan!',
        // refactor message response
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: { status: HttpStatus.NOT_FOUND, total_data: 0 },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data pengajuan surat
    return {
      success: true,
      // message: 'Pengajuan surat berhasil ditemukan.',
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
  async findOne(id: string) {
    // return `This action returns a #${id} pengajuanSurat`;

    // menggunakan try catch
    try {
      // ambil data pengajuan surat berdasarkan id dari database
      const data = await this.prisma.pengajuanSurat.findUnique({
        where: { id },
        include: {
          detail: true,
          dokumen: true,
          status_log: {
            orderBy: {
              created_at: 'desc',
            },
          },
        },
      });

      // jika data pengajuan surat tidak ditemukan, maka throw exception
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Pengajuan surat tidak ditemukan!',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // jika data ditemukan, maka tampilkan respon dan data pengajuan surat
      return {
        success: true,
        message: 'Pengajuan surat berhasil ditemukan.',
        metadata: {
          status: HttpStatus.OK,
        },
        data,
      };
    } catch (error) {
      // jika error merupakan NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;

      // jika error lainnya, maka throw BadRequestException
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid!',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method updateStatus
  async updateStatus(id: string, updateStatusDto: UpdateStatusDto) {
    // return `This action updates a #${id} pengajuanSurat`;

    // menggunakan try catch
    try {
      // ambil data pengajuan surat berdasarkan id dari database
      const current = await this.prisma.pengajuanSurat.findUnique({
        where: { id },
      });

      // jika data pengajuan surat tidak ditemukan, maka throw exception
      if (!current) {
        throw new NotFoundException({
          success: false,
          message: 'Pengajuan surat tidak ditemukan!',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // cek apakah status yang akan diupdate valid berdasarkan status saat ini
      const STATUS_TRANSITIONS: Record<string, string[]> = {
        MENUNGGU: ['DIPROSES'],
        DIPROSES: ['SELESAI', 'DITOLAK'],
        DITOLAK: [],
        SELESAI: [],
      };

      // ambil status saat ini
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

      // update data pengajuan surat berdasarkan id dari database
      await this.prisma.pengajuanSurat.update({
        where: { id },
        data: {
          status: updateStatusDto.status,
          catatan_admin: updateStatusDto.catatan_admin,
          status_log: {
            create: {
              status: updateStatusDto.status,
              keterangan: updateStatusDto.keterangan,
            },
          },
        },
      });

      // response jika data berhasil diupdate
      return {
        success: true,
        message: 'Status pengajuan berhasil diupdate.',
        metadata: { status: HttpStatus.OK },
      };
    } catch (error) {
      // jika terjadi error, maka throw error tersebut
      if (error instanceof HttpException) throw error;

      // jika error lainnya, maka throw BadRequestException
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid!',
        metadata: { status: HttpStatus.BAD_REQUEST },
      });
    }
  }

  // method remove
  async remove(id: string) {
    // return `This action removes a #${id} pengajuanSurat`;

    // menggunakan try catch
    try {
      // ambil data pengajuan surat berdasarkan id dari database
      const data = await this.prisma.pengajuanSurat.findUnique({
        where: { id },
      });

      // jika data pengajuan surat tidak ditemukan, maka throw exception
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Pengajuan surat tidak ditemukan!',
          metadata: { status: HttpStatus.NOT_FOUND },
        });
      }

      // jika data ditemukan, maka hapus data pengajuan surat berdasarkan id dari database
      await this.prisma.pengajuanSurat.delete({
        where: { id },
      });

      // response jika data berhasil dihapus
      return {
        success: true,
        message: 'Pengajuan surat berhasil dihapus.',
        metadata: { status: HttpStatus.OK },
      };
    } catch (error) {
      // jika error merupakan NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;

      // jika error lainnya, maka throw BadRequestException
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid!',
        metadata: { status: HttpStatus.BAD_REQUEST },
      });
    }
  }
}
