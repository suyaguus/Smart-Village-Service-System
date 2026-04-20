import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // buat constructor untuk inject PrismaService
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';

    // cek apakah email sudah terdaftar atau belum
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    // jika email sudah terdaftar, maka throw exception
    if (existingUser) {
      throw new ConflictException({
        success: false,
        message: 'Email sudah terdaftar!',
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }

    // hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // simpan data user baru ke database
    await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    // response jika data berhasil disimpan
    return {
      success: true,
      message: 'User barhasil dibuat.',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    // return `GET DATA USER`;

    // membuat fungsi untuk mengambil semua data user dari database
    const data = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    // jika data user tidak ditemukan, maka kirimkan pesan error
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Data user tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: 0,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data user
    return {
      success: true,
      message: 'Data user berhasil ditemukan.',
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
    const data = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    // jika data user tidak ditemukan, maka kirimkan pesan error
    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'User tidak ditemukan!',
        metadata: {
          status: HttpStatus.NOT_FOUND,
        },
      });
    }

    // jika data ditemukan, maka tampilkan respon dan data user
    return {
      success: true,
      message: 'Data user berhasil ditemukan.',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;

    // cek apakah user ada atau tidak
    await this.findOne(id);

    // jika user mengupdate password, hash terlebih dahulu sebelum disimpan ke database
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
