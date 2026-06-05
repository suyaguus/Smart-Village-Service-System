import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { JenisSuratService } from './jenis-surat.service';

@Controller('jenis-surat')
@UseGuards(JwtAccessGuard)
export class JenisSuratController {
  constructor(private readonly jenisSuratService: JenisSuratService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.jenisSuratService.create(body);
  }
}
