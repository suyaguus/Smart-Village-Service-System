import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWellcome(): string {
    return 'API User Service Port 3001';
  }
}

// logic untuk service utama aplikasi, bisa digunakan untuk menyimpan fungsi-fungsi umum yang dibutuhkan di seluruh aplikasi.
