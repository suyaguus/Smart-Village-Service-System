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
}
