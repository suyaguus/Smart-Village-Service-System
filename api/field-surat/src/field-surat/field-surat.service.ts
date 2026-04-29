import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFieldSuratDto } from './dto/create-field-surat.dto';
import { UpdateFieldSuratDto } from './dto/update-field-surat.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FieldSuratService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  // method create
  async create(createFieldSuratDto: CreateFieldSuratDto) {
    // return 'This action adds a new fieldSurat';

    // simpan field surat baru ke database
    await this.prisma.fieldSurat.create({
      data: createFieldSuratDto,
    });

    // response jika data berhasil disimpan
    return {
      success: true,
      message: 'Field Surat berhasil dibuat.',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // method findAll
  async findAll() {
    // return `This action returns all fieldSurat`;

    // ambil semua data field surat dari database
    const data = await this.prisma.fieldSurat.findMany();

    // jika jenis surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Field Surat tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data field surat
    return {
      success: true,
      message: 'Field Surat berhasil ditemukan.',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  // method find by jenis surat
  async findByJenisSurat(jenis_surat_id: number) {
    // ambil data field surat berdasarkan jenis surat id dari database
    const data = await this.prisma.fieldSurat.findMany({
      where: { jenis_surat_id },
      orderBy: { field_order: 'asc' },
    });

    // jika field surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Field Surat tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data field surat
    return {
      success: true,
      message: 'Field Surat berhasil ditemukan.',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  // method findOne
  async findOne(id: number) {
    // return `This action returns a #${id} fieldSurat`;

    // ambil data field surat berdasarkan id dari database
    const data = await this.prisma.fieldSurat.findUnique({
      where: { id },
    });

    // jika data field surat tidak ditemukan, maka throw exception
    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Field Surat tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
        },
      });
    }
  }

  update(id: number, updateFieldSuratDto: UpdateFieldSuratDto) {
    return `This action updates a #${id} fieldSurat`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldSurat`;
  }
}
