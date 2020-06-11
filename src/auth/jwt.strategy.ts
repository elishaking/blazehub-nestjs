import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as app from 'firebase/app';
import 'firebase/database';
import { JwtPayload } from './auth.interface';
import { UnauthorizedException } from '@nestjs/common';
import { getUserIdFromEmail } from './auth.util';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const userId = getUserIdFromEmail(payload.email);
    const user = app
      .database()
      .ref('users')
      .child(userId)
      .once('value');

    if (!user) throw new UnauthorizedException('Your account was not found');

    return user;
  }
}
