import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PengajuanSuratModule } from './pengajuan-surat/pengajuan-surat.module';

@Module({
  imports: [PengajuanSuratModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
