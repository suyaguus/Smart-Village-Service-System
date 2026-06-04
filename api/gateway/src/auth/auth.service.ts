import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  //   login
  login(dto: AuthDto) {
    // validasi username dan password
    if (
        dto.username !== process.env.ADMIN_USERNAME ||
        dto.password !== process.env.ADMIN_PASSWORD
    )
  }
}
