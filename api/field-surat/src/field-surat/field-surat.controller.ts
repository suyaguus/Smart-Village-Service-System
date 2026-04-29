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
import { FieldSuratService } from './field-surat.service';
import { CreateFieldSuratDto } from './dto/create-field-surat.dto';
import { UpdateFieldSuratDto } from './dto/update-field-surat.dto';

// custom ParseIntPipe untuk override pesan error default
const IntParam = new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  exceptionFactory: () =>
    new BadRequestException({
      success: false,
      message: 'Request tidak valid!',
      metadata: { status: HttpStatus.BAD_REQUEST },
    }),
});

@Controller('field-surat')
export class FieldSuratController {
  constructor(private readonly fieldSuratService: FieldSuratService) {}

  @Post()
  create(@Body() createFieldSuratDto: CreateFieldSuratDto) {
    return this.fieldSuratService.create(createFieldSuratDto);
  }

  @Get()
  findAll() {
    return this.fieldSuratService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldSuratService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFieldSuratDto: UpdateFieldSuratDto,
  ) {
    return this.fieldSuratService.update(+id, updateFieldSuratDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldSuratService.remove(+id);
  }
}
