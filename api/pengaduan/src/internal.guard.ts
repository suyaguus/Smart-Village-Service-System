import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class InternalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const secret = request.headers['x-internal-secret'];

    if (secret !== process.env.INTERNAL_SECRET) {
      throw new UnauthorizedException({
        success: false,
        message: 'Akses ditolak!',
        metadata: {
          status: HttpStatus.UNAUTHORIZED,
        },
      });
    }

    return true;
  }
}
