import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenUrlService } from './token-url.service';
import { PasswordService } from './password.service';
import { JwtStrategy } from './jwt.strategy';
import { variables } from '../../app/config';
import { EmailModule } from '../email/email.module';

const ONE_DAY = 86400;

@Module({
  imports: [
    UsersModule,
    EmailModule,
    PassportModule,
    JwtModule.register({
      secret: variables.JWT_SECRET,
      signOptions: {
        expiresIn: ONE_DAY,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenUrlService, PasswordService, JwtStrategy],
  // exports: [JwtStrategy],
})
export class AuthModule {}
