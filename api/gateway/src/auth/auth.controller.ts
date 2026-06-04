import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

interface RequestWithUser extends Request {
  user: { username: string };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
}
