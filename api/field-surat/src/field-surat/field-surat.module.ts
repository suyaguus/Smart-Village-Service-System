import { Module } from '@nestjs/common';
import { FieldSuratService } from './field-surat.service';
import { FieldSuratController } from './field-surat.controller';

@Module({
  controllers: [FieldSuratController],
  providers: [FieldSuratService],
})
export class FieldSuratModule {}
