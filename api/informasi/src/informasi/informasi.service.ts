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
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import {
  INFORMASI_FOTO_SELECT,
  INFORMASI_LIST_SELECT,
  INFORMASI_SELECT,
} from 'src/common/constants/select';
import { notExistInformasi } from 'src/common/utils/not-exist.util';

@Injectable()
export class InformasiService {
  // buat constructor untuk inject PrismaService dan CloudinaryService
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  // method create
  async create(
    createInformasiDto: CreateInformasiDto,
    // file: Express.Multer.File,
  ) {
    // return 'This action adds a new informasi';

    // simpan data informasi baru ke database
    await this.prisma.informasi.create({
      // data: createInformasiDto,
      // menambahkan foto ke data informasi jika ada file yang diupload
      // data: {
      //   ...createInformasiDto,
      //   foto: file ? file.filename : null,
      // },
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
      // refactor mengecek apakah data dengan id ditemukan
      await notExistInformasi(
        id,
        this.prisma,
        process.env.NOT_FOUND_MESSAGE ?? '',
      );

      // cek apakah informasi dengan id tersebut ada di database
      const data = await this.prisma.informasi.findUnique({
        where: { id },
        // refactor menambahkan select untuk mengambil field tertentu saja
        select: INFORMASI_SELECT,
      });

      // jika data tidak ditemukan, maka throw exception
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: 'Informasi tidak ditemukan.',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // jika data ditemukan, maka tampilkan respon dan data informasi
      return {
        success: true,
        // message: 'Informasi berhasil ditemukan.',
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

      // jika terjadi error, maka kirimkan pesan error
      throw new BadRequestException({
        success: false,
        // message: 'Request tidak valid.',
        // refactor message response
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method update
  async update(
    id: number,
    updateInformasiDto: UpdateInformasiDto,
    // file: Express.Multer.File,
  ) {
    // return `This action updates a #${id} informasi`;

    // menggunakan try catch
    try {
      // cek apakah informasi dengan id tersebut ada di database
      // const data = await this.prisma.informasi.findUnique({
      //   where: { id },
      // });

      // refactor mengecek apakah data dengan id ada id database
      await notExistInformasi(
        id,
        this.prisma,
        process.env.NOT_FOUND_MESSAGE ?? '',
      );

      // jika data tidak ditemukan, maka throw exception
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: 'Informasi tidak ditemukan.',
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // jika data ditemukan, maka update data informasi berdasarkan id
      await this.prisma.informasi.update({
        where: { id },
        // data: updateInformasiDto,
        // menambahkan foto ke data informasi jika ada file yang diupload
        // data: {
        //   ...updateInformasiDto,
        //   ...(file && { foto: file.filename }),
        // },
        data: updateInformasiDto,
      });

      // jika data berhasil diupdate, maka kirimkan pesan respon
      return {
        success: true,
        // message: 'Informasi berhasil diupdate.',
        // refactor message response
        message: process.env.SUCCESS_UPDATE_MESSAGE,
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
        // message: 'Request tidak valid.',
        // refactor message response
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method remove
  async remove(id: number) {
    try {
      // cek apakah informasi dengan id tersebut ada di database
      await notExistInformasi(
        id,
        this.prisma,
        process.env.NOT_FOUND_MESSAGE ?? '',
      );

      // hapus semua foto dari Cloudinary sebelum hapus data informasi
      const fotos = await this.prisma.informasiFoto.findMany({
        where: { informasi_id: id },
      });

      for (const foto of fotos) {
        // hapus dari Cloudinary menggunakan public_id
        await this.cloudinary.deleteImage(foto.public_id);
      }

      // hapus data informasi (foto di db akan terhapus via onDelete: Cascade)
      await this.prisma.informasi.delete({ where: { id } });

      return {
        success: true,
        message: process.env.SUCCESS_DELETE_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method addFoto
  async addFoto(id: number, file: Express.Multer.File) {
    try {
      // cek apakah informasi dengan id tersebut ada di database
      await notExistInformasi(
        id,
        this.prisma,
        process.env.NOT_FOUND_MESSAGE ?? '',
      );

      // upload foto ke Cloudinary menggunakan buffer dari memoryStorage
      const { url, public_id } = await this.cloudinary.uploadImage(
        file.buffer,
        file.mimetype,
      );

      // simpan url dan public_id ke database
      const data = await this.prisma.informasiFoto.create({
        data: {
          informasi_id: id,
          url,
          public_id,
        },
        select: INFORMASI_FOTO_SELECT,
      });

      return {
        success: true,
        message: process.env.SUCCESS_SAVE_FOTO_MESSAGE,
        metadata: {
          status: HttpStatus.CREATED,
        },
        data,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // method removeFoto
  async removeFoto(id: number, foto_id: number) {
    try {
      // cek apakah informasi dengan id tersebut ada di database
      await notExistInformasi(
        id,
        this.prisma,
        process.env.NOT_FOUND_MESSAGE ?? '',
      );

      // cek apakah foto dengan foto_id tersebut ada di database
      const foto = await this.prisma.informasiFoto.findUnique({
        where: { id: foto_id },
      });

      if (!foto) {
        throw new NotFoundException({
          success: false,
          message: process.env.NOT_FOUND_FOTO_MESSAGE,
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // hapus foto dari Cloudinary menggunakan public_id
      await this.cloudinary.deleteImage(foto.public_id);

      // hapus foto dari database
      await this.prisma.informasiFoto.delete({ where: { id: foto_id } });

      return {
        success: true,
        message: process.env.SUCCESS_DELETE_FOTO_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
