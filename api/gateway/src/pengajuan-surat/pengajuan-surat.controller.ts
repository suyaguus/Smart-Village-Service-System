import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { PengajuanSuratService } from './pengajuan-surat.service';

@Controller('pengajuan-surat')
@UseGuards(JwtAccessGuard)
export class PengajuanSuratController {
  constructor(private readonly pengajuanSuratService: PengajuanSuratService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.pengajuanSuratService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.pengajuanSuratService.findAll();
  }
}
