import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { PengajuanSuratService } from './pengajuan-surat.service';
import { CreatePengajuanSuratDto } from './dto/create-pengajuan-surat.dto';
import { UpdateStatusDto } from './dto/update-pengajuan-surat.dto';

@Controller('pengajuan-surat')
export class PengajuanSuratController {
  constructor(private readonly pengajuanSuratService: PengajuanSuratService) {}

  // endpoint untuk membuat pengajuan surat baru
  @Post()
  create(@Body() createPengajuanSuratDto: CreatePengajuanSuratDto) {
    return this.pengajuanSuratService.create(createPengajuanSuratDto);
  }

  // endpoint untuk mendapatkan semua pengajuan surat
  @Get()
  findAll() {
    return this.pengajuanSuratService.findAll();
  }

  // tambahkan endpoint untuk mendapatkan pengajuan surat berdasarkan user_id
  @Get('user/:user_id')
  findByUser(
    @Param(
      'user_id',
      new ParseUUIDPipe({
        exceptionFactory: () => {
          new BadRequestException({
            success: false,
            message: process.env.BAD_REQUEST_MESSAGE,
            metadata: {
              status: HttpStatus.BAD_REQUEST,
            },
          });
        },
      }),
    )
    user_id: string,
  ) {
    return this.pengajuanSuratService.findByUser(user_id);
  }

  // tambahkan endpoint untuk mendapatkan pengajuan surat berdasarkan id
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException({
            success: false,
            message: process.env.BAD_REQUEST_MESSAGE,
            metadata: { status: HttpStatus.BAD_REQUEST },
          }),
      }),
    )
    id: string,
  ) {
    return this.pengajuanSuratService.findOne(id);
  }

  // tambahkan endpoint untuk update status pengajuan surat
  @Patch(':id')
  updateStatus(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException({
            success: false,
            message: process.env.BAD_REQUEST_MESSAGE,
            metadata: { status: HttpStatus.BAD_REQUEST },
          }),
      }),
    )
    id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.pengajuanSuratService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengajuanSuratService.remove(+id);
  }
}
