import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { EmailModule } from 'src/email/email.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [FriendsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
