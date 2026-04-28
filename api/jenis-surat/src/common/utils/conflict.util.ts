import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const conflictKodeSurat = async (
  kode_surat: string,
  prisma: PrismaService['jenisSurat'],
  message: string,
  id?: number,
) => {
  // cek data jenis surat berdasarkan kode_surat
  const exist = await prisma.findFirst({
    where: {
      kode_surat,
      ...(id ? { NOT: { id } } : undefined),
    },
  });

  //   jika data jenis surat ditemukan, maka kirimkan conflict exception
  if (exist) {
    throw new ConflictException({
      success: false,
      message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }
};
