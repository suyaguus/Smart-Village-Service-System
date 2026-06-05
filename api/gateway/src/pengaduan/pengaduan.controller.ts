import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { PengaduanService } from './pengaduan.service';

@Controller('pengaduan')
@UseGuards(JwtAccessGuard)
export class PengaduanController {
  constructor(private readonly pengaduanService: PengaduanService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.pengaduanService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.pengaduanService.findAll();
  }
}
