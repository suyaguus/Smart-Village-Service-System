import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GoogleGuard } from './guards/google.guard';

interface RequestWithUser extends Request {
  user: { sub: number | null; email: string; role: string };
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

  // redirect login dengan google
  @UseGuards(GoogleGuard)
  @Get('google')
  googleLogin() {
    // Passport otomatis redirect ke Google, tidak perlu isi apapun di sini
  }
}
