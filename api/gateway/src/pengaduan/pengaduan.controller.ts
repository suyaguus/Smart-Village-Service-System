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
import { PengaduanService } from './pengaduan.service';
import { CreatePengaduanDto } from './dto/create-pengaduan.dto';
import { UpdateStatusPengaduanDto } from './dto/update-status-pengaduan.dto';
import { CreateResponPengaduanDto } from './dto/create-respon-pengaduan.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('pengaduan')
@UseGuards(JwtAccessGuard, RolesGuard)
export class PengaduanController {
  constructor(private readonly pengaduanService: PengaduanService) {}

  //   method post
  @Roles('USER')
  @Post()
  create(@Body() body: CreatePengaduanDto) {
    return this.pengaduanService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.pengaduanService.findAll();
  }

  //   method get by user
  @Roles('USER')
  @Get('user/:user_id')
  findByUser(@Param('user_id') user_id: string) {
    return this.pengaduanService.findByUser(user_id);
  }

  //   method get by id
  @Roles('USER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pengaduanService.findOne(id);
  }

  //   method update status
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStatusPengaduanDto,
  ) {
    return this.pengaduanService.updateStatus(id, body);
  }

  //   method create respon feedback
  @Post(':id/respon')
  createRespon(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateResponPengaduanDto,
  ) {
    return this.pengaduanService.createRespon(id, body);
  }

  //   method delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pengaduanService.remove(id);
  }
}
