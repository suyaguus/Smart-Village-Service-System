import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JenisSuratService } from './jenis-surat.service';
import { CreateJenisSuratDto } from './dto/create-jenis-surat.dto';
import { UpdateJenisSuratDto } from './dto/update-jenis-surat.dto';

@Controller('jenis-surat')
export class JenisSuratController {
  constructor(private readonly jenisSuratService: JenisSuratService) {}

  @Post()
  create(@Body() createJenisSuratDto: CreateJenisSuratDto) {
    return this.jenisSuratService.create(createJenisSuratDto);
  }

  @Get()
  findAll() {
    return this.jenisSuratService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jenisSuratService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJenisSuratDto: UpdateJenisSuratDto) {
    return this.jenisSuratService.update(+id, updateJenisSuratDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jenisSuratService.remove(+id);
  }
}
