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
import { JenisSuratService } from './jenis-surat.service';

@Controller('jenis-surat')
@UseGuards(JwtAccessGuard)
export class JenisSuratController {
  constructor(private readonly jenisSuratService: JenisSuratService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.jenisSuratService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.jenisSuratService.findAll();
  }

  //   method get by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jenisSuratService.findOne(id);
  }
}
