import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFieldSuratDto } from './dto/create-field-surat.dto';
import { UpdateFieldSuratDto } from './dto/update-field-surat.dto';
import { PrismaService } from 'src/prisma.service';
import { FIELD_SURAT_SELECT } from 'src/common/constants/select';
import { notExistFieldSurat } from 'src/common/utils/not-exist.util';
import { conflictFieldName } from 'src/common/utils/conflict.util';

@Injectable()
export class FieldSuratService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  // method create
  async create(createFieldSuratDto: CreateFieldSuratDto) {
    // return 'This action adds a new fieldSurat';

    // simpan field surat baru ke database
    // await this.prisma.fieldSurat.create({
    //   data: createFieldSuratDto,
    // });

    // refactor: menambahkan conflict field name
    await conflictFieldName(
      createFieldSuratDto.jenis_surat_id,
      createFieldSuratDto.field_name,
      this.prisma.fieldSurat,
      process.env.CONFLICT_FIELD_MESSAGE ?? '',
    );
    // simpan field surat baru ke database
    await this.prisma.fieldSurat.create({
      data: createFieldSuratDto,
    });

    // response jika data berhasil disimpan
    return {
      success: true,
      // message: 'Field Surat berhasil dibuat.',
      // refactor message response
      message: process.env.SUCCESS_SAVE_MESSAGE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  // method findAll
  async findAll() {
    // return `This action returns all fieldSurat`;

    // ambil semua data field surat dari database
    // const data = await this.prisma.fieldSurat.findMany();

    // refactor: ambil semua data field surat dari database dengan select field tertentu
    const data = await this.prisma.fieldSurat.findMany({
      select: FIELD_SURAT_SELECT,
    });

    // jika jenis surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        // message: 'Field Surat tidak ditemukan!',
        // refactor message response
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data field surat
    return {
      success: true,
      // message: 'Field Surat berhasil ditemukan.',
      // refactor: mengganti message response
      message: process.env.SUCCESS_FIND_MESSAGE,
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
      // refactor: menambahakan field select
      select: FIELD_SURAT_SELECT,
      orderBy: { field_order: 'asc' },
    });

    // jika field surat tidak ditemukan, maka throw exception
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        // message: 'Field Surat tidak ditemukan!',
        // refactor: mengganti message response
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data field surat
    return {
      success: true,
      // message: 'Field Surat berhasil ditemukan.',
      // refactor: mengganti message response
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
    // return `This action returns a #${id} fieldSurat`;
    // ambil data field surat berdasarkan id dari database
    // const data = await this.prisma.fieldSurat.findUnique({
    //   where: { id },
    // });
    // jika data field surat tidak ditemukan, maka throw exception
    // // if (!data) {
    // //   throw new NotFoundException({
    // //     success: false,
    // //     message: 'Field Surat tidak ditemukan!',
    // //     metadata: {
    // //       status: HttpStatus.NOT_FOUND,
    // //     },
    // //   });
    // // }
    // // jika field surat ditemukan kirimkan pesan respon
    // return {
    //   success: false,
    //   message: 'Field surat berhasil ditemukan!',
    //   metadata: {
    //     status: HttpStatus.OK,
    //   },
    //   data,
    // };

    // refactor: menggunakan try catch
    try {
      // ambil data field surat berdasarkan id dari database
      const data = await notExistFieldSurat(id, this.prisma.fieldSurat);

      // jika data berhasil ditemukan, maka kirimkan pesan respon
      return {
        success: true,
        message: process.env.SUCCESS_FIND_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
        data,
      };
    } catch (error) {
      // jika terjadi error, maka kirimkan pesan error
      if (error instanceof NotFoundException) throw error;

      // jika terjadi error lain, maka kirimkan bad request exception
      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method update
  async update(id: number, updateFieldSuratDto: UpdateFieldSuratDto) {
    // return `This action updates a #${id} fieldSurat`;

    // membuat fungsi try catch
    try {
      // update data field surat berdasarkan id dari database
      // await this.findOne(id);

      // refactor: menggunakan fungsi notExistFieldSurat untuk mengecek apakah data field surat dengan id tersebut ada di database
      await notExistFieldSurat(id, this.prisma.fieldSurat);

      // refactor: menambahkan conflict field name
      if (
        updateFieldSuratDto.field_name ||
        updateFieldSuratDto.jenis_surat_id
      ) {
        const current = await this.prisma.fieldSurat.findUnique({
          where: { id },
        });
        await conflictFieldName(
          updateFieldSuratDto.jenis_surat_id ?? current!.jenis_surat_id,
          updateFieldSuratDto.field_name ?? current!.field_name,
          this.prisma.fieldSurat,
          process.env.CONFLICT_FIELD_UPDATE_MESSAGE ?? '',
          id,
        );
      }

      // jika data field surat ditemukan, maka update data field surat
      await this.prisma.fieldSurat.update({
        where: { id },
        data: updateFieldSuratDto,
      });

      // jika data berhasil diupdate, maka kirimkan pesan respon
      return {
        success: true,
        // message: 'Field Surat berhasil diupdate.',
        // refactor: mengganti message response
        message: process.env.SUCCESS_UPDATE_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // jika terjadi error, maka kirimkan pesan error
      if (error instanceof HttpException) throw error;

      // jika terjadi error lain, maka kirimkan bad request exception
      throw new BadRequestException({
        succes: false,
        // message: 'Request Tidak Valid.',
        // refactor: mengganti message response
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method remove
  async remove(id: number) {
    // return `This action removes a #${id} fieldSurat`;

    // membuat fungsi try catch
    try {
      // mengecek apakah field surat dengan id tersebut ada di database
      // await this.findOne(id);

      // refactor: menggunakan fungsi notExistFieldSurat untuk mengecek apakah data field surat dengan id tersebut ada di database
      await notExistFieldSurat(id, this.prisma.fieldSurat);

      // jika field surat ditemukan, maka hapus data field surat
      await this.prisma.fieldSurat.delete({
        where: { id },
      });

      // response jika data berhasil dihapus
      return {
        success: true,
        // message: 'Field Surat berhasil dihapus.',
        // refactor: mengganti message response
        message: process.env.SUCCESS_DELETE_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // membuat kondisi jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) throw error;

      // kirimkan response jika terjadi error
      throw new BadRequestException({
        success: false,
        // message: 'Request Tidak Valid.',
        // refactor: mengganti message response
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
