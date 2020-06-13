import { Injectable } from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';

@Injectable()
export class FriendsService {
  dbRef = app.database().ref();

  async fetchFriends(userId: string) {
    const friendsSnapShot = await this.dbRef
      .child('friends')
      .child(userId)
      .once('value');

    return friendsSnapShot.exists() ? friendsSnapShot.val() : [];
  }
}
