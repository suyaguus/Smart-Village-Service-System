import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
}
