import { Module } from '@nestjs/common';
import { JenisSuratService } from './jenis-surat.service';
import { JenisSuratController } from './jenis-surat.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [JenisSuratController],
  providers: [JenisSuratService, PrismaService],
})
export class JenisSuratModule {}
