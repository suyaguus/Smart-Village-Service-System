import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { InformasiService } from './informasi.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';

@Controller('informasi')
@UseGuards(JwtAccessGuard)
export class InformasiController {
  constructor(private readonly informasiService: InformasiService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.informasiService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.informasiService.findAll();
  }

  //   method get by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.informasiService.findOne(id);
  }

  //   method update
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    return this.informasiService.update(id, body);
  }

  //   method delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.informasiService.remove(id);
  }

  //   method add foto
  @Post(':id/foto')
  @UseInterceptors(FileInterceptor('foto', { storage: memoryStorage() }))
  addFoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.informasiService.addFoto(id, file);
  }

  //   method remove foto
  @Delete(':id/foto/:foto_id')
  removeFoto(
    @Param('id', ParseIntPipe) id: number,
    @Param('foto_id', ParseIntPipe) foto_id: number,
  ) {
    return this.informasiService.removeFoto(id, foto_id);
  }
}
