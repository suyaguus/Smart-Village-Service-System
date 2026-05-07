import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInformasiDto } from './dto/create-informasi.dto';
import { UpdateInformasiDto } from './dto/update-informasi.dto';
import { PrismaService } from 'src/prisma.service';
import {
  INFORMASI_LIST_SELECT,
  INFORMASI_SELECT,
} from 'src/common/constants/select';

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
      // message: 'Informasi berhasil dibuat.',
      // refactor message response
      message: process.env.SUCCESS_SAVE_MESSAGE,
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
      // refactor menambahkan select untuk mengambil field tertentu saja
      select: INFORMASI_LIST_SELECT,
    });

    // jika data kosong, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        // message: 'Infomasi tidak ditemukan.',
        // refactor message response
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data informasi
    return {
      success: true,
      // message: 'Informasi berhasil ditemukan.',
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
    // return `This action returns a #${id} informasi`;

    // menggunakan try catch
    try {
      // cek apakah informasi dengan id tersebut ada di database
      const data = await this.prisma.informasi.findUnique({
        where: { id },
      });

      // jika data tidak ditemukan, maka throw exception
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Informasi tidak ditemukan.',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // jika data ditemukan, maka tampilkan respon dan data informasi
      return {
        success: true,
        message: 'Informasi berhasil ditemukan.',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;

      // jika terjadi error, maka kirimkan pesan error
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid.',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method update
  async update(id: number, updateInformasiDto: UpdateInformasiDto) {
    // return `This action updates a #${id} informasi`;

    // menggunakan try catch
    try {
      // cek apakah informasi dengan id tersebut ada di database
      const data = await this.prisma.informasi.findUnique({
        where: { id },
      });

      // jika data tidak ditemukan, maka throw exception
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Informasi tidak ditemukan.',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // jika data ditemukan, maka update data informasi berdasarkan id
      await this.prisma.informasi.update({
        where: { id },
        data: updateInformasiDto,
      });

      // jika data berhasil diupdate, maka kirimkan pesan respon
      return {
        success: true,
        message: 'Informasi berhasil diupdate.',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // jika terjadi error kirimkan http exception
      if (error instanceof HttpException) throw error;

      // jika terjadi error, maka kirimkan pesan error
      throw new BadRequestException({
        success: false,
        message: 'Request tidak valid.',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method remove
  async remove(id: number) {
    // return `This action removes a #${id} informasi`;

    // menggunakan try catch
    try {
      // cek apakah informasi dengan id tersebut ada di database
      const data = await this.prisma.informasi.findUnique({
        where: { id },
      });

      // jika data tidak ditemukan, maka throw exception
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: 'Informasi tidak ditemukan.',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // jika data ditemukan, maka hapus data informasi berdasarkan id
      await this.prisma.informasi.delete({
        where: { id },
      });

      // jika data berhasil dihapus, maka kirimkan pesan respon
      return {
        success: true,
        message: 'Informasi berhasil dihapus.',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;

      // jika terjadi error, maka kirimkan pesan error
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
