import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleMobileStrategy } from './strategies/google-mobile.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    GoogleMobileStrategy,
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
