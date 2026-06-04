import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

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

  //   refresh
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req: RequestWithUser) {
    return this.authService.refresh(req.user);
  }
}
