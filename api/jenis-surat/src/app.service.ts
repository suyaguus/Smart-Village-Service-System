import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWellcome(): string {
    return 'API Jenis Surat Port 3002';
  }
}
