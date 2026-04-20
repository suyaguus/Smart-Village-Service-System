import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

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

  if(existingUser) {
    throw new ConflictException({
      success: false,
      message: 'Email sudah terdaftar!',
      metadata: { status: HttpStatus.CONFLICT },
    });
  }

  findAll() {
    return `This action returns all user`;
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
