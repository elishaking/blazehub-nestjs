import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './auth.interface';
import { UserDto } from './dto/user.dto';
import { UsersService } from 'src/users/users.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    const userSnapshot = await this.userService.findByEmailSnapshot(
      payload.email,
    );
    if (!userSnapshot.exists())
      throw new UnauthorizedException('Your account was not found');

    return new UserDto(payload);
  }
}
