import { Module } from '@nestjs/common';
import { InformasiService } from './informasi.service';
import { InformasiController } from './informasi.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InformasiController],
  providers: [InformasiService, PrismaService],
})
export class InformasiModule {}
