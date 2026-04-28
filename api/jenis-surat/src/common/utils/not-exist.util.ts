// buat fungsi untuk cek data jenis surat
// (jika tidak ditemukan datanya)

import { PrismaService } from 'src/prisma.service';
import { JENIS_SURAT_SELECT } from '../constants/select';
import { HttpStatus, NotFoundException } from '@nestjs/common';

export const notExistJenisSurat = async (
  id: number,
  prisma: PrismaService['jenisSurat'],
) => {
  // cek apakah jenis surat dengan id tersebut ada atau tidak
  const data = await prisma.findUnique({
    where: { id },
    select: JENIS_SURAT_SELECT,
  });

  //   jika data jenis surat tidak ditemukan, maka kirimkan pesan error
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: process.env.NOT_FOUND_MESSAGE,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  //   jika data jenis surat ditemukan, maka kembalikan data jenis surat
  return data;
};
