import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJenisSuratDto } from './dto/create-jenis-surat.dto';
import { UpdateJenisSuratDto } from './dto/update-jenis-surat.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JenisSuratService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  // methode create
  async create(createJenisSuratDto: CreateJenisSuratDto) {
    // return 'This action adds a new jenisSurat';

    // cek duplikasi kode_surat
    const existingJenisSurat = await this.prisma.jenisSurat.findUnique({
      where: { kode_surat: createJenisSuratDto.kode_surat },
    });

    // jika kode_surat sudah terdaftar, maka throw exception
    if (existingJenisSurat) {
      throw new ConflictException({
        success: false,
        message: 'Kode Surat sudah terdaftar!',
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }

    // simpan jenis surat baru ke database
    await this.prisma.jenisSurat.create({
      data: createJenisSuratDto,
    });

    // response jika data berhasil disimpan
    return {
      success: true,
      message: 'Jenis Surat berhasil dibuat.',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    // return `This action returns all jenisSurat`;

    // membuat fungsi untuk mengambil semua data jenis surat dari database
    const data = await this.prisma.jenisSurat.findMany();

    // jika jenis surat tidak ditemukan, maka kirimkan pesan error
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Jenis Surat tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // jika data jenis surat ditemukan, maka kirimkan response sukses
    return {
      success: true,
      message: 'Jenis Surat berhasil ditemukan.',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  async findOne(id: number) {
    // return `This action returns a #${id} jenisSurat`;

    // membuat fungsi untuk mengambil data jenis surat dari database berdasarkan id
    const data = await this.prisma.jenisSurat.findUnique({ where: { id } });

    // jika data jenis surat tidak ditemukan, maka kirimkan pesan error
    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Jenis Surat tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
        },
      });
    }

    // jika data jenis surat ditemukan, maka kirimkan response sukses
    return {
      success: true,
      message: 'Jenis Surat berhasil ditemukan.',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  // method update
  async update(id: number, updateJenisSuratDto: UpdateJenisSuratDto) {
    // return `This action updates a #${id} jenisSurat`;

    // cek apakah jenis surat dengan id tersebut ada di database
    await this.findOne(id);

    // cek duplikasi kode_surat jika kode_surat diupdate
    if (updateJenisSuratDto.kode_surat) {
      const existingJenisSurat = await this.prisma.jenisSurat.findFirst({
        where: {
          kode_surat: updateJenisSuratDto.kode_surat,
          NOT: { id },
        },
      });

      // jika kode_surat sudah terdaftar, maka throw exception
      if (existingJenisSurat) {
        throw new ConflictException({
          success: false,
          message: 'Kode Surat sudah terdaftar!',
          metadata: {
            status: HttpStatus.CONFLICT,
          },
        });
      }
    }

    // update data jenis surat di database
    await this.prisma.jenisSurat.update({
      where: { id },
      data: updateJenisSuratDto,
    });

    // tampilakan response jika data berhasil diupdate
    return {
      success: true,
      message: 'Jenis Surat berhasil diupdate.',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }

  async remove(id: number) {
    // return `This action removes a #${id} jenisSurat`;

    // cek apakah jenis surat dengan id tersebut ada di database
    await this.findOne(id);

    // jika data ditemukan maka hapus data jenis surat dari database
    await this.prisma.jenisSurat.delete({ where: { id } });

    // tampilakan response jika data berhasil dihapus
    return {
      success: true,
      message: 'Jenis Surat berhasil dihapus.',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }
}
