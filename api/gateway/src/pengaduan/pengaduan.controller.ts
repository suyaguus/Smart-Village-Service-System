import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { PengaduanService } from './pengaduan.service';

@Controller('pengaduan')
@UseGuards(JwtAccessGuard)
export class PengaduanController {
  constructor(private readonly pengaduanService: PengaduanService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.pengaduanService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.pengaduanService.findAll();
  }

  //   method get by user
  @Get('user/:user_id')
  findByUser(@Param('user_id') user_id: string) {
    return this.pengaduanService.findByUser(user_id);
  }

  //   method get by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pengaduanService.findOne(id);
  }

  //   method update status
  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    return this.pengaduanService.updateStatus(id, body);
  }
}
