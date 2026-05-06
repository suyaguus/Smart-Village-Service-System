import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { InformasiService } from './informasi.service';
import { CreateInformasiDto } from './dto/create-informasi.dto';
import { UpdateInformasiDto } from './dto/update-informasi.dto';

// membuat custom ParseIntPipe untuk override pesan error default
const IntParam = (property: string) =>
  Param(
    property,
    new ParseIntPipe({
      exceptionFactory: () =>
        new BadRequestException({
          success: false,
          message: process.env.BAD_REQUEST_MESSAGE,
          metadata: { status: HttpStatus.BAD_REQUEST },
        }),
    }),
  );

@Controller('informasi')
export class InformasiController {
  constructor(private readonly informasiService: InformasiService) {}

  @Post()
  create(@Body() createInformasiDto: CreateInformasiDto) {
    return this.informasiService.create(createInformasiDto);
  }

  @Get()
  findAll() {
    return this.informasiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informasiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInformasiDto: UpdateInformasiDto,
  ) {
    return this.informasiService.update(+id, updateInformasiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informasiService.remove(+id);
  }
}
