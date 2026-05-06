import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PengaduanModule } from './pengaduan/pengaduan.module';

@Module({
  imports: [PengaduanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
