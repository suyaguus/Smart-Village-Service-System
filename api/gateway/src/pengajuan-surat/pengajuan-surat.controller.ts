import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { PengajuanSuratService } from './pengajuan-surat.service';
import { CreatePengajuanSuratDto } from './dto/create-pengajuan-surat.dto';
import { UpdateStatusPengajuanSuratDto } from './dto/update-status-pengajuan-surat.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('pengajuan-surat')
@UseGuards(JwtAccessGuard, RolesGuard)
export class PengajuanSuratController {
  constructor(private readonly pengajuanSuratService: PengajuanSuratService) {}

  //   method post
  @Roles('USER')
  @Post()
  create(@Body() body: CreatePengajuanSuratDto) {
    return this.pengajuanSuratService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.pengajuanSuratService.findAll();
  }

  //   method get by user_id
  @Roles('USER')
  @Get('user/:user_id')
  findByUser(@Param('user_id') user_id: string) {
    return this.pengajuanSuratService.findByUser(user_id);
  }

  //   method get by id
  @Roles('USER')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pengajuanSuratService.findOne(id);
  }

  //   method update status pengajuan surat
  @Patch(':id')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateStatusPengajuanSuratDto,
  ) {
    return this.pengajuanSuratService.updateStatus(id, body);
  }

  //   method delete
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pengajuanSuratService.remove(id);
  }
}
