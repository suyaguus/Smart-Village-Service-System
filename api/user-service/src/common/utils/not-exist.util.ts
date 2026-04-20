// buat fungsi untuk cek data kategori
// (jika tidak ditemukqan datanya)

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const notExistUser = async (
  id: number,
  prisma: PrismaService['user'],
) => {
  // tampilkan data user berdasarkan id
  const data = await prisma.findUnique({
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
      message: process.env.NOT_FOUND_MESSAGE,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }
};
