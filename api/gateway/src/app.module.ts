import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JenisSuratModule } from './jenis-surat/jenis-surat.module';

@Module({
  imports: [AuthModule, UserModule, JenisSuratModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
