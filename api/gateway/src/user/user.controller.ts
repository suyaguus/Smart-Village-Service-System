import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   method post
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  //   method get
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('USER')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //   method get by id
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('USER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  //   method patch
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('USER')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  //   method delete
  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
