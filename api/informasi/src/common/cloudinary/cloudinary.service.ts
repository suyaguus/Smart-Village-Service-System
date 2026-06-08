import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

// konfigurasi cloudinary menggunakan env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  // method untuk upload gambar ke cloudinary
  async uploadImage(
    buffer: Buffer,
    mimetype: string,
  ): Promise<{ url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'smart-village/informasi',
          resource_type: 'image',
          format: mimetype.split('/')[1], // jpg, png, webp
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            reject(
              new BadRequestException('Gagal mengupload foto ke Cloudinary.'),
            );
            return;
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );

      uploadStream.end(buffer);
    });
  }

  // method untuk menghapus gambar dari cloudinary berdasarkan public_id
  async deleteImage(public_id: string): Promise<void> {
    await cloudinary.uploader.destroy(public_id);
  }
}
