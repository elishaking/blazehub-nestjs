import { Injectable } from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';
import { CreateFriendDto, InviteFriendsDto } from './dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class FriendsService {
  dbRef = app.database().ref();

  constructor(private emailService: EmailService) {}

  async fetchFriends(userId: string) {
    const friendsSnapShot = await this.dbRef
      .child('friends')
      .child(userId)
      .once('value');

    return friendsSnapShot.exists() ? friendsSnapShot.val() : [];
  }

  async createFriend(createFriendDto: CreateFriendDto) {
    const { userId, friendId, friend, name } = createFriendDto;

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
        name,
      });

    return { [friendId]: friend };
  }

  async inviteFriends(data: InviteFriendsDto) {
    const { emails, firstName, lastName } = data;

    for (let i = 0; i < emails.length; i++) {
      await this.emailService.sendInviteEmail({
        email: emails[i],
        subject: `${firstName} | Hi, Join me on BlazeHub`,
        context: {
          firstName,
          lastName,
          link: '',
        },
        template: 'invite',
      });
    }
  }
}
