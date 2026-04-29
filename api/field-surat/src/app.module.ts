import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FieldSuratModule } from './field-surat/field-surat.module';

@Module({
  imports: [FieldSuratModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
