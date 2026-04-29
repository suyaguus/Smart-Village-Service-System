import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldSuratService } from './field-surat.service';
import { CreateFieldSuratDto } from './dto/create-field-surat.dto';
import { UpdateFieldSuratDto } from './dto/update-field-surat.dto';

@Controller('field-surat')
export class FieldSuratController {
  constructor(private readonly fieldSuratService: FieldSuratService) {}

  @Post()
  create(@Body() createFieldSuratDto: CreateFieldSuratDto) {
    return this.fieldSuratService.create(createFieldSuratDto);
  }

  @Get()
  findAll() {
    return this.fieldSuratService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldSuratService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldSuratDto: UpdateFieldSuratDto) {
    return this.fieldSuratService.update(+id, updateFieldSuratDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldSuratService.remove(+id);
  }
}
