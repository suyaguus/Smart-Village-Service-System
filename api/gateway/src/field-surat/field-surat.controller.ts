import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FieldSuratService } from './field-surat.service';

@Controller('field-surat')
@UseGuards(JwtAccessGuard)
export class FieldSuratController {
  constructor(private readonly fieldSuratService: FieldSuratService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.fieldSuratService.create(body);
  }
}
