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
import { JenisSuratService } from './jenis-surat.service';
import { CreateJenisSuratDto } from './dto/create-jenis-surat.dto';
import { UpdateJenisSuratDto } from './dto/update-jenis-surat.dto';

@Controller('jenis-surat')
@UseGuards(JwtAccessGuard)
export class JenisSuratController {
  constructor(private readonly jenisSuratService: JenisSuratService) {}

  //   method post
  @Post()
  create(@Body() body: CreateJenisSuratDto) {
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

  //   method patch
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateJenisSuratDto,
  ) {
    return this.jenisSuratService.update(id, body);
  }

  //   method delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jenisSuratService.remove(id);
  }
}
