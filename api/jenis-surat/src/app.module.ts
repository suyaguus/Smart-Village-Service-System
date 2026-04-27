import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JenisSuratModule } from './jenis-surat/jenis-surat.module';

@Module({
  imports: [JenisSuratModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
