import { Injectable } from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';
import { CreateFriendDto } from './dto';

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

  async createFriend(createFriendDto: CreateFriendDto) {
    const { userId, friendId, friend, user } = createFriendDto;

    // add new-friend to current-user's friends db
    await this.dbRef
      .child('friends')
      .child(userId)
      .child(friendId)
      .set(friend);

    // add current-user to new-friend's db
    await this.dbRef
      .child('friends')
      .child(friendId)
      .child(userId)
      .set({
        name: `${user.firstName} ${user.lastName}`,
      });

    return { [friendId]: friend };
  }
}
