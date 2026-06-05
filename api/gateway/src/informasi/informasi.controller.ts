import { Controller, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { InformasiService } from './informasi.service';

@Controller('informasi')
@UseGuards(JwtAccessGuard)
export class InformasiController {
  constructor(private readonly informasiService: InformasiService) {}
}
