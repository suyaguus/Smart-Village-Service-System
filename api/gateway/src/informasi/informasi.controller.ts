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
import { InformasiService } from './informasi.service';

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
}
