import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();

    // 1. ADMIN selalu punya akses penuh ke semua endpoint
    if (user?.role === 'ADMIN') {
      return true;
    }

    // 2. Jika tidak ada dekorator @Roles(), kunci endpoint secara default (Khusus ADMIN)
    if (!requiredRoles) {
      throw new ForbiddenException(
        'Akses ditolak. Endpoint ini hanya untuk ADMIN.',
      );
    }

    // 3. Cek apakah role user saat ini (USER) ada di dalam daftar @Roles()
    if (!requiredRoles.includes(user?.role)) {
      throw new ForbiddenException(
        'Akses ditolak. Role Anda tidak memiliki izin.',
      );
    }

    return true;
  }
}
