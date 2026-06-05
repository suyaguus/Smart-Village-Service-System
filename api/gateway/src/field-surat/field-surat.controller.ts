import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FieldSuratService } from './field-surat.service';

@Controller('field-surat')
@UseGuards(JwtAccessGuard)
export class FieldSuratController {
  constructor(private readonly fieldSuratService: FieldSuratService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.fieldSuratService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.fieldSuratService.findAll();
  }

  //   method get by jenis-surat
  @Get('jenis-surat/:jenis_surat_id')
  findByJenisSurat(
    @Param('jenis_surat_id', ParseIntPipe) jenis_surat_id: number,
  ) {
    return this.fieldSuratService.findByJenisSurat(jenis_surat_id);
  }

  //   method get by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fieldSuratService.findOne(id);
  }
}
