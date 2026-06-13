import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FieldSuratService } from './field-surat.service';
import { CreateFieldSuratDto } from './dto/create-field-surat.dto';
import { UpdateFieldSuratDto } from './dto/update-field-surat.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('field-surat')
@UseGuards(JwtAccessGuard, RolesGuard)
export class FieldSuratController {
  constructor(private readonly fieldSuratService: FieldSuratService) {}

  //   method post
  @Post()
  create(@Body() body: CreateFieldSuratDto) {
    return this.fieldSuratService.create(body);
  }

  //   method get
  @Roles('USER')
  @Get()
  findAll() {
    return this.fieldSuratService.findAll();
  }

  //   method get by jenis-surat
  @Roles('USER')
  @Get('jenis-surat/:jenis_surat_id')
  findByJenisSurat(
    @Param('jenis_surat_id', ParseIntPipe) jenis_surat_id: number,
  ) {
    return this.fieldSuratService.findByJenisSurat(jenis_surat_id);
  }

  //   method get by id
  @Roles('USER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fieldSuratService.findOne(id);
  }

  //   method patch
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFieldSuratDto,
  ) {
    return this.fieldSuratService.update(id, body);
  }

  //   method delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fieldSuratService.remove(id);
  }
}
