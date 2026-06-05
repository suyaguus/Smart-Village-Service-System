import { Controller, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { PengaduanService } from './pengaduan.service';

@Controller('pengaduan')
@UseGuards(JwtAccessGuard)
export class PengaduanController {
  constructor(private readonly pengaduanService: PengaduanService) {}
}
