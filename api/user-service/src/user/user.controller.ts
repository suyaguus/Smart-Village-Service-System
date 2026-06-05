import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InternalGuard } from 'src/internal.guard';

// custom ParseIntPipe untuk override pesan error default
const IntParam = new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  exceptionFactory: () =>
    new BadRequestException({
      success: false,
      message: process.env.BAD_REQUEST_MESSAGE,
      metadata: { status: HttpStatus.BAD_REQUEST },
    }),
});

@Controller('user')
// menambahkan guard internal untuk mengamankan endpoint ini agar hanya bisa diakses
// oleh service lain dengan secret tertentu
@UseGuards(InternalGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(InternalGuard)
  @Post('find-by-email')
  findByEmail(@Body('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(InternalGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(InternalGuard)
  @Get(':id')
  findOne(@Param('id', IntParam) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(InternalGuard)
  @Patch(':id')
  update(
    @Param('id', IntParam) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(InternalGuard)
  @Delete(':id')
  remove(@Param('id', IntParam) id: number) {
    return this.userService.remove(id);
  }
}
