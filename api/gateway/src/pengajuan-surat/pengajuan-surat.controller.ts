import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  //   method get by user_id
  @Get('user/:user_id')
  findByUser(@Param('user_id') user_id: string) {
    return this.pengajuanSuratService.findByUser(user_id);
  }

  //   method get by id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pengajuanSuratService.findOne(id);
  }

  //   method update status pengajuan surat
  @Patch(':id/status')
  updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() body: unknown) {
    return this.pengajuanSuratService.updateStatus(id, body);
  }
}
