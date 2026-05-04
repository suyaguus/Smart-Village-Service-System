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

// membuat custom ParseIntPipe untuk override pesan error default
const IntParam = (property: string) =>
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

  // tambahkan endpoint untuk mendapatkan pengaduan berdasarkan user_id
  @Get('user/:user_id')
  findByUser(@Param('user_id') user_id: string) {
    return this.pengaduanService.findByUser(user_id);
  }

  // tambahkan endpoint untuk mendapatkan pengaduan berdasarkan id
  @Get(':id')
  findOne(@IntParam('id') id: number) {
    return this.pengaduanService.findOne(id);
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
