import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { PengaduanService } from './pengaduan.service';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';
import { UpdatePengaduanDto } from './dto/update-pengaduan.dto';

@Controller('pengaduan')
export class PengaduanController {
  constructor(private readonly pengaduanService: PengaduanService) {}

  // endpoint untuk membuat pengaduan baru
  @Post()
  create(@Body() createPengaduanDto: CreatePengaduanDto) {
    return this.pengaduanService.create(createPengaduanDto);
  }

  // endpoint untuk mendapatkan semua pengaduan
  @Get()
  findAll() {
    return this.pengaduanService.findAll();
  }

  // membuat custom ParseIntPipe untuk override pesan error default
  IntParam = (property: string) =>
    Param(
      property,
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException({
            success: false,
            message: process.env.BAD_REQUEST_MESSAGE,
            metadata: {
              status: HttpStatus.BAD_REQUEST,
            },
          }),
      }),
    );

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengaduanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePengaduanDto: UpdatePengaduanDto,
  ) {
    return this.pengaduanService.update(+id, updatePengaduanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengaduanService.remove(+id);
  }
}
