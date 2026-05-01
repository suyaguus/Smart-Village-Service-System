import { PrismaService } from 'src/prisma.service';
import { FIELD_SURAT_SELECT } from '../constants/select';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { HttpStatus } from '@nestjs/common';

export const notExistFieldSurat = async (
  id: number,
  prisma: PrismaService['fieldSurat'],
) => {
  // cek data field surat berdasarkan id
  const data = await prisma.findUnique({
    where: { id },
    select: FIELD_SURAT_SELECT,
  });

  //   jika data field surat tidak ditemukan, maka kirimkan not found exception
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: process.env.NOT_FOUND_MESSAGE,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  //   jika data field surat ditemukan, maka return data field surat
  return data;
};
