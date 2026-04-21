import {
  BadRequestException,
  // ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { conflictEmail } from 'src/common/utils/conflict.util';
import { notExistUser } from 'src/common/utils/not-exist.util';
import { USER_SELECT } from 'src/common/constants/select';

@Injectable()
export class UserService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';

    // cek apakah email sudah terdaftar atau belum
    // const existingUser = await this.prisma.user.findUnique({
    //   where: { email: createUserDto.email },
    // });

    // // jika email sudah terdaftar, maka throw exception
    // if (existingUser) {
    //   throw new ConflictException({
    //     success: false,
    //     message: 'Email sudah terdaftar!',
    //     metadata: {
    //       status: HttpStatus.CONFLICT,
    //     },
    //   });
    // }

    // refactor: cek duplikasi email / panggil fungsi email conflict
    await conflictEmail(
      createUserDto.email,
      this.prisma.user,
      process.env.CONFLICT_EMAIL_MESSAGE ?? '',
    );

    // hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // simpan data user baru ke database
    await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    // refactor: response jika data berhasil disimpan
    return {
      success: true,
      message: process.env.CREATE_USER_SUCCESS_MESSAGE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    // return `GET DATA USER`;

    // membuat fungsi untuk mengambil semua data user dari database
    const data = await this.prisma.user.findMany({
      select: USER_SELECT,
    });

    // jika data user tidak ditemukan, maka kirimkan pesan error
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data user
    return {
      success: true,
      message: process.env.SUCCESS_FIND_MESSAGE,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;

    // membuat fungsi untuk mengambil data user berdasarkan id dari database
    // const data = await this.prisma.user.findUnique({
    //   where: { id },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     phone: true,
    //     role: true,
    //     created_at: true,
    //     updated_at: true,
    //   },
    // });

    // jika data user tidak ditemukan, maka kirimkan pesan error
    // if (!data) {
    //   throw new NotFoundException({
    //     success: false,
    //     message: 'User tidak ditemukan!',
    //     metadata: {
    //       status: HttpStatus.NOT_FOUND,
    //     },
    //   });
    // }

    // jika data ditemukan, maka tampilkan respon dan data user
    // return {
    //   success: true,
    //   message: 'Data user berhasil ditemukan.',
    //   metadata: {
    //     status: HttpStatus.OK,
    //   },
    //   data,
    // };

    // refactor: menambahkan fungsi try catch
    try {
      // panggil fungsi notExistUser
      const data = await notExistUser(id, this.prisma.user);

      // response jika data berhasil ditemukan
      return {
        success: true,
        message: process.env.SUCCESS_FIND_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
        data,
      };
    } catch (error) {
      // membuat kondisi jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    // cek apakah user ada atau tidak
    // await this.findOne(id);
    // jika user mengupdate password, hash terlebih dahulu sebelum disimpan ke database
    // if (updateUserDto.password) {
    //   updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    // }
    // jika update email, cek apakah email sudah terdaftar atau belum
    // if (updateUserDto.email) {
    //   const existingUser = await this.prisma.user.findUnique({
    //     where: { email: updateUserDto.email },
    //   });
    // jika email sudah terdaftar, maka throw exception
    // if (existingUser && existingUser.id !== id) {
    //   throw new ConflictException({
    //     success: false,
    //     message: 'Email sudah digunakan user lain!',
    //     metadata: {
    //       status: HttpStatus.CONFLICT,
    //     },
    //   });
    // }
    // }
    // update data user ke database
    // await this.prisma.user.update({
    //   where: { id },
    //   data: updateUserDto,
    // });
    // response jika data berhasil diupdate
    // return {
    //   success: true,
    //   message: 'Data user berhasil diupdate.',
    //   metadata: {
    //     status: HttpStatus.OK,
    //   },
    // };
    // }

    // refacotor: menambahkan fungsi try catch
    try {
      // mengecek apakah user ada atau tidak
      await notExistUser(id, this.prisma.user);

      // jika id user ditemuukan, maka cek duplikasi email
      if (updateUserDto.email) {
        // panngil fungsi conflictEmail
        await conflictEmail(
          updateUserDto.email,
          this.prisma.user,
          process.env.CONFLICT_EMAIL_UPDATE_MESSAGE ?? '',
          id,
        );
      }

      // jika user ingin mengupdate password, hash password terlebih dahulu sebelum disimpan ke database
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // update data user ke database
      await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      // reponse jika data berhasil di update
      return {
        success: true,
        message: process.env.SUCCESS_UPDATE_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // membuat kondisi jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) {
        throw error;
      }

      // kirimkan response jika terjadi error
      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    // cek apakah user ada atau tidak
    // await this.findOne(id);
    // jika user ada, maka hapus data user
    // await this.prisma.user.delete({
    //   where: { id },
    // });
    // response jika data berhasil dihapus
    // return {
    //   success: true,
    //   message: 'Data user berhasil dihapus.',
    //   metadata: {
    //     status: HttpStatus.OK,
    //   },
    // };

    // refactor: menambahkan fungsi try catch
    try {
      // mengecek apakah user ada atau tidak
      await notExistUser(id, this.prisma.user);

      // jika user ditemukan, maka hapus data user
      await this.prisma.user.delete({ where: { id } });

      // response jika data berhasil dihapus
      return {
        success: true,
        message: process.env.SUCCESS_DELETE_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // membuat kondisi jika error yang terjadi adalah NotFoundException, maka throw error tersebut
      if (error instanceof NotFoundException) {
        throw error;
      }

      // kirimkan response jika terjadi error
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
