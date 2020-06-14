import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { EmailService } from 'src/email/email.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [FriendsService, EmailService, JwtStrategy],
  controllers: [FriendsController],
})
export class FriendsModule {}
