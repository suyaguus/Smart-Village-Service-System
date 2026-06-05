import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { user_api } from 'src/common/axios/user.axios';
import { AuthDto } from './dto/auth.dto';

interface JwtPayload {
  sub: number | null;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private issueTokens(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '5m',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
      type: 'Bearer',
    };
  }

  //   login
  async login(dto: AuthDto) {
    // --- cek admin via env (email = ADMIN_USERNAME & plain password) ---
    if (
      dto.email === process.env.ADMIN_USERNAME &&
      dto.password === process.env.ADMIN_PASSWORD
    ) {
      const payload: JwtPayload = {
        sub: null,
        email: dto.email,
        role: 'ADMIN',
      };
      return {
        success: true,
        message: 'Login berhasil.',
        metadata: { status: HttpStatus.CREATED },
        data: this.issueTokens(payload),
      };
    }

    // --- cek user di database via user-service ---
    let dbUser: {
      id: number;
      email: string;
      password: string;
      role: string;
    } | null = null;

    try {
      const response = await user_api.post<{
        id: number;
        email: string;
        password: string;
        role: string;
      }>('/find-by-email', { email: dto.email });
      dbUser = response.data;
    } catch {
      // user tidak ditemukan atau service error → lanjut ke pesan error bawah
    }

    if (!dbUser) {
      throw new BadRequestException({
        success: false,
        message: 'Email atau password salah.',
        metadata: { status: HttpStatus.BAD_REQUEST },
      });
    }

    const passwordMatch = await compare(dto.password, dbUser.password);
    if (!passwordMatch) {
      throw new BadRequestException({
        success: false,
        message: 'Email atau password salah.',
        metadata: { status: HttpStatus.BAD_REQUEST },
      });
    }

    const payload: JwtPayload = {
      sub: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    };

    return {
      success: true,
      message: 'Login berhasil.',
      metadata: { status: HttpStatus.CREATED },
      data: this.issueTokens(payload),
    };
  }

  //   refresh
  refresh(user: JwtPayload) {
    const payload: JwtPayload = {
      sub: user.sub,
      email: user.email,
      role: user.role,
    };

    return {
      success: true,
      message: 'Access token berhasil diperbarui.',
      metadata: { status: HttpStatus.CREATED },
      data: {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '5m',
        }),
      },
    };
  }
}
