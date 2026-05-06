import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InformasiModule } from './informasi/informasi.module';

@Module({
  imports: [InformasiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
