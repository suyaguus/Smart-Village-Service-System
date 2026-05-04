// buat fungsi untuk cek data jenis surat
// (jika tidak ditemukan datanya)

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const notExistPengajuan = async (
  id: string,
  prisma: PrismaService['pengajuanSurat'],
  message: string,
) => {
  // cek apakah pengajuan surat dengan id tersebut ada atau tidak
  const data = await prisma.findUnique({
    where: { id },
  });

  //   jika data pengajuan surat tidak ditemukan, maka kirimkan pesan error
  if (!data) {
    throw new NotFoundException({
      success: false,
      message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  //   jika data pengajuan surat ditemukan, maka kembalikan data pengajuan surat
  return data;
};
