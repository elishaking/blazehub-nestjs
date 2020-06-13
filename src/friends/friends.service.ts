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

  async createFriend(data: any) {
    const { userid, friendId, friend, user } = data;

    // add new-friend to current-user's friends db
    await this.dbRef
      .child('friends')
      .child(userid)
      .child(friendId)
      .set(friend);

    // add current-user to new-friend's db
    await this.dbRef
      .child('friends')
      .child(friendId)
      .child(userid)
      .set({
        name: `${user.firstName} ${user.lastName}`,
      });

    return { [friendId]: friend };
  }
}
