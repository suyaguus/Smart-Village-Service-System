// buat fungsi untuk cek data jenis surat
// (jika tidak ditemukan datanya)

import { PrismaService } from 'src/prisma.service';
import { JENIS_SURAT_SELECT } from '../constants/select';

export const notExistJenisSurat = async (
  id: number,
  prisma: PrismaService['jenisSurat'],
) => {
  // cek apakah jenis surat dengan id tersebut ada atau tidak
  const data = await prisma.findUnique({
    where: { id },
    select: JENIS_SURAT_SELECT,
  });
};
