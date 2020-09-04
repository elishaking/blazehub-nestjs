import { Module } from '@nestjs/common';

import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
// import { JwtStrategy } from 'src/auth/jwt.strategy';
// import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
// import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [EmailModule],
  providers: [FriendsService],
  controllers: [FriendsController],
  exports: [FriendsService],
})
export class FriendsModule {}
