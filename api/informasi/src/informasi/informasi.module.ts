import { Module } from '@nestjs/common';
import { InformasiService } from './informasi.service';
import { InformasiController } from './informasi.controller';

@Module({
  controllers: [InformasiController],
  providers: [InformasiService],
})
export class InformasiModule {}
