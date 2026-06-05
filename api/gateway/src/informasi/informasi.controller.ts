import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { InformasiService } from './informasi.service';

@Controller('informasi')
@UseGuards(JwtAccessGuard)
export class InformasiController {
  constructor(private readonly informasiService: InformasiService) {}

  //   method get
  @Post()
  create(@Body() body: unknown) {
    return this.informasiService.create(body);
  }
}
