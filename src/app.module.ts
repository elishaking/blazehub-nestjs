import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { FriendsModule } from './friends/friends.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, EmailModule, FriendsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
