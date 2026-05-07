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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InformasiService } from './informasi.service';
import { CreateInformasiDto } from './dto/create-informasi.dto';
import { UpdateInformasiDto } from './dto/update-informasi.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  // method create
  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  create(
    @Body() createInformasiDto: CreateInformasiDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.informasiService.create(createInformasiDto, file);
  }

  // method findAll
  @Get()
  findAll() {
    return this.informasiService.findAll();
  }

  // method findOne
  @Get(':id')
  findOne(@IntParam('id') id: number) {
    return this.informasiService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto'))
  update(
    @IntParam('id') id: number,
    @Body() updateInformasiDto: UpdateInformasiDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.informasiService.update(id, updateInformasiDto, file);
  }

  @Delete(':id')
  remove(@IntParam('id') id: number) {
    return this.informasiService.remove(id);
  }
}
