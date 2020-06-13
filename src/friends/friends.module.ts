import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [FriendsService, EmailService],
  controllers: [FriendsController],
})
export class FriendsModule {}
