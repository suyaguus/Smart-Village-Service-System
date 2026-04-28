import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { JenisSuratService } from './jenis-surat.service';
import { CreateJenisSuratDto } from './dto/create-jenis-surat.dto';
import { UpdateJenisSuratDto } from './dto/update-jenis-surat.dto';

// custom ParseIntPipe untuk override pesan error default
const IntParam = new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  exceptionFactory: () =>
    new BadRequestException({
      success: false,
      message: 'Request tidak valid!',
      metadata: {
        status: HttpStatus.BAD_REQUEST,
      },
    }),
});

@Controller('jenis-surat')
export class JenisSuratController {
  constructor(private readonly jenisSuratService: JenisSuratService) {}

  @Post()
  create(@Body() createJenisSuratDto: CreateJenisSuratDto) {
    return this.jenisSuratService.create(createJenisSuratDto);
  }

  @Get()
  findAll() {
    return this.jenisSuratService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IntParam) id: number) {
    return this.jenisSuratService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateJenisSuratDto: UpdateJenisSuratDto,
  ) {
    return this.jenisSuratService.update(id, updateJenisSuratDto);
  }

  @Delete(':id')
  remove(@Param('id', IntParam) id: number) {
    return this.jenisSuratService.remove(id);
  }
}
