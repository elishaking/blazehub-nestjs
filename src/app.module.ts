import { Module } from '@nestjs/common';
import * as firebaseApp from 'firebase/app';

import { firebaseConfig } from './app/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FriendsModule } from './modules/friends/friends.module';
import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module';

const app = firebaseApp.initializeApp(firebaseConfig);

@Module({
  imports: [FriendsModule, UsersModule, AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async onModuleDestroy() {
    return app.delete();
  }
}
