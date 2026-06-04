import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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
    ) {
      // jika username atau password salah, lempar exception dengan pesan error yang sesuai
      throw new BadRequestException({
        success: false,
        message: 'Username atau password salah.',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }

    // membuat payload untuk token JWT
    const payload: JwtPayload = { username: dto.username };

    // kirimkan response dengan token JWT yang sudah dibuat
    return {
      success: true,
      message: 'Login berhasil.',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_ACCESS_SECRET,
        }),
        refresh_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        }),
        type: 'Bearer',
      },
    };
  }
}
