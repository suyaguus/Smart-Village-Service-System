import { PrismaService } from 'src/prisma.service';

export const notExistPengaduan = async (
  id: number,
  prisma: PrismaService['pengaduan'],
  message: string,
) => {
  // ambil data pengaduan berdasarkan id dari database
  const data = await prisma.findUnique({ where: { id } });
};
