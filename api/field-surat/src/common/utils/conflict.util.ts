import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// buat fungsi conflict field name
export const conflictFieldName = async (
  jenis_surat_id: number,
  field_name: string,
  prisma: PrismaService['fieldSurat'],
  message: string,
  id?: number,
) => {
  // cek duplikasi field name berdasarkan jenis surat id dan field name
  const existingFieldName = await prisma.findFirst({
    where: {
      jenis_surat_id,
      field_name,
      ...(id ? { NOT: { id } } : undefined),
    },
  });

  //   jika field name sudah terdaftar, maka throw exception
  if (existingFieldName) {
    throw new ConflictException({
      success: false,
      message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }
};
