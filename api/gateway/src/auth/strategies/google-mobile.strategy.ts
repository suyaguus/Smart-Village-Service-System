import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleMobileStrategy extends PassportStrategy(
  Strategy,
  'google-mobile',
) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_MOBILE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: { displayName: string; emails: { value: string }[] },
    done: VerifyCallback,
  ) {
    const { displayName, emails } = profile;
    done(null, {
      name: displayName,
      email: emails[0].value,
    });
  }
}
