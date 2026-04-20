import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
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
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
