import { ConflictException, HttpStatus } from '@nestjs/common';
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

  // jika data user ditemukan, maka kirimkan conflict exception
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
