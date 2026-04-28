import { PrismaService } from 'src/prisma.service';

export const conflictKodeSuratc = async (
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
};
