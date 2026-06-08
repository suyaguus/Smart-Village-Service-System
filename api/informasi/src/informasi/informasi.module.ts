import { Module } from '@nestjs/common';
import { InformasiService } from './informasi.service';
import { InformasiController } from './informasi.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  imports: [
    MulterModule.register({
      // menggunakan memoryStorage agar file tersimpan sebagai buffer
      // dan dikirim langsung ke Cloudinary (tidak disimpan ke disk)
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        const allowed = /\.(jpg|jpeg|png|webp)$/i;
        if (!allowed.test(file.originalname)) {
          return cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
    }),
  ],
  controllers: [InformasiController],
  providers: [InformasiService, PrismaService, CloudinaryService],
})
export class InformasiModule {}
