// buat fungsi untuk cek data jenis surat
// (jika tidak ditemukan datanya)

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
};
