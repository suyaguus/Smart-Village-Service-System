import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PengaduanService } from './pengaduan.service';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';
import { UpdatePengaduanDto } from './dto/update-pengaduan.dto';

@Controller('pengaduan')
export class PengaduanController {
  constructor(private readonly pengaduanService: PengaduanService) {}

  @Post()
  create(@Body() createPengaduanDto: CreatePengaduanDto) {
    return this.pengaduanService.create(createPengaduanDto);
  }

  @Get()
  findAll() {
    return this.pengaduanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengaduanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePengaduanDto: UpdatePengaduanDto) {
    return this.pengaduanService.update(+id, updatePengaduanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengaduanService.remove(+id);
  }
}
