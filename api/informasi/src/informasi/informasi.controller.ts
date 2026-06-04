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
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InformasiService } from './informasi.service';
import { CreateInformasiDto } from './dto/create-informasi.dto';
import { UpdateInformasiDto } from './dto/update-informasi.dto';
import { InternalGuard } from 'src/internal.guard';

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
// menambahkan guard internal untuk mengamankan endpoint ini agar hanya bisa diakses
// oleh service lain dengan secret tertentu
@UseGuards(InternalGuard)
export class InformasiController {
  constructor(private readonly informasiService: InformasiService) {}

  // method create
  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  create(
    @Body() createInformasiDto: CreateInformasiDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    return this.informasiService.create(createInformasiDto);
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
    // @UploadedFile() file: Express.Multer.File,
  ) {
    return this.informasiService.update(id, updateInformasiDto);
  }

  @Delete(':id')
  remove(@IntParam('id') id: number) {
    return this.informasiService.remove(id);
  }

  // method addFoto
  @Post(':id/foto')
  @UseInterceptors(FileInterceptor('foto'))
  addFoto(
    @IntParam('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.informasiService.addFoto(id, file);
  }

  // method removeFoto
  @Delete(':id/foto/:foto_id')
  removeFoto(@IntParam('id') id: number, @IntParam('foto_id') foto_id: number) {
    return this.informasiService.removeFoto(id, foto_id);
  }
}
