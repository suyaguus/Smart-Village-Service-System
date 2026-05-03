import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PengajuanSuratService } from './pengajuan-surat.service';
import { CreatePengajuanSuratDto } from './dto/create-pengajuan-surat.dto';
import { UpdatePengajuanSuratDto } from './dto/update-pengajuan-surat.dto';

@Controller('pengajuan-surat')
export class PengajuanSuratController {
  constructor(private readonly pengajuanSuratService: PengajuanSuratService) {}

  @Post()
  create(@Body() createPengajuanSuratDto: CreatePengajuanSuratDto) {
    return this.pengajuanSuratService.create(createPengajuanSuratDto);
  }

  @Get()
  findAll() {
    return this.pengajuanSuratService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengajuanSuratService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePengajuanSuratDto: UpdatePengajuanSuratDto) {
    return this.pengajuanSuratService.update(+id, updatePengajuanSuratDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengajuanSuratService.remove(+id);
  }
}
