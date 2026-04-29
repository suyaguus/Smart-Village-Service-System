import { HttpStatus, Injectable } from '@nestjs/common';
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
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldSurat`;
  }

  update(id: number, updateFieldSuratDto: UpdateFieldSuratDto) {
    return `This action updates a #${id} fieldSurat`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldSurat`;
  }
}
