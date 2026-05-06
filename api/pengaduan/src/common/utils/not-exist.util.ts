import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const notExistPengaduan = async (
  id: number,
  prisma: PrismaService['pengaduan'],
  message: string,
) => {
  // ambil data pengaduan berdasarkan id dari database
  const data = await prisma.findUnique({ where: { id } });

  //   jika data pengaduan tidak ditemukan, maka throw exception
  if (!data) {
    throw new NotFoundException({
      success: false,
      message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  //   jika data ditemukan, maka return data pengaduan
  return data;
};
