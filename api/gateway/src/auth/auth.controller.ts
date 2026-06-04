import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

interface RequestWithUser extends Request {
  user: { username: string };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   login
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
