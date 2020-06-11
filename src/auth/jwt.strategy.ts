import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as app from 'firebase/app';
import 'firebase/database';
import { JwtPayload } from './auth.interface';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = app
      .database()
      .ref('users')
      .orderByChild('email')
      .equalTo(payload.email)
      .once('value');

    if (!user) throw new UnauthorizedException('Your account was not found');

    return user;
  }
}
