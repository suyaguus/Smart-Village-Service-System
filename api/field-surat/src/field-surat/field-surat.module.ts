import { Module } from '@nestjs/common';
import { FieldSuratService } from './field-surat.service';
import { FieldSuratController } from './field-surat.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FieldSuratController],
  providers: [FieldSuratService, PrismaService],
})
export class FieldSuratModule {}
