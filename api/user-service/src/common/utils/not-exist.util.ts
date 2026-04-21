// buat fungsi untuk cek data kategori
// (jika tidak ditemukqan datanya)

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { USER_SELECT } from '../constants/select';

export const notExistUser = async (
  id: number,
  prisma: PrismaService['user'],
) => {
  // tampilkan data user berdasarkan id
  const data = await prisma.findUnique({
    where: { id },
    select: USER_SELECT,
  });

  // jika data user tidak ditemukan, maka kirimkan pesan error
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: process.env.NOT_FOUND_MESSAGE,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  return data;
};
