import { Controller, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FieldSuratService } from 'src/field-surat/field-surat.service';

@Controller('pengajuan-surat')
@UseGuards(JwtAccessGuard)
export class PengajuanSuratController {
  constructor(private readonly fieldSuratService: FieldSuratService) {}
}
