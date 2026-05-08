import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export async function notExistInformasi(
  id: number,
  prisma: PrismaService,
  message: string,
) {
  // mengecek apakah data dengan id ada di database
  const data = await prisma.informasi.findUnique({
    where: { id },
  });

  //   jika data tidak ditemukan kirimkan not found
  if (!data) {
    throw new NotFoundException({
      success: false,
      message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  //   jika data berhasil ditemukan kirimkan data
  return data;
}
