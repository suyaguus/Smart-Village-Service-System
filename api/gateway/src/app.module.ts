import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JenisSuratModule } from './jenis-surat/jenis-surat.module';
import { FieldSuratModule } from './field-surat/field-surat.module';
import { PengajuanSuratModule } from './pengajuan-surat/pengajuan-surat.module';
import { PengaduanModule } from './pengaduan/pengaduan.module';
import { InformasiModule } from './informasi/informasi.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    JenisSuratModule,
    FieldSuratModule,
    PengajuanSuratModule,
    PengaduanModule,
    InformasiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
