import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAccessGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   method post
  @Post()
  create(@Body() body: unknown) {
    return this.userService.create(body);
  }

  //   method get
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
