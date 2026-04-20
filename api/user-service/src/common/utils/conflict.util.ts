import { PrismaService } from 'src/prisma.service';

export const conflictEmail = async (
  email: string,
  prisma: PrismaService['user'],
  message: string,
  id?: number,
) => {
  // cek data user berdasarkan email
  const exist = await prisma.findFirst({
    where: {
      email,
      ...(id ? { NOT: { id } } : undefined),
    },
  });
};
