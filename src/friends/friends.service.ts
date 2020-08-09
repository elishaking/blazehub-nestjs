import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';

import { CreateFriendDto, InviteFriendsDto } from './dto';
import { EmailService } from 'src/email/email.service';
import { UserDto } from 'src/auth/dto';

@Injectable()
export class FriendsService {
  dbRef = app.database().ref();

  constructor(private emailService: EmailService) {}

  async create(createFriendDto: CreateFriendDto, userDto: UserDto) {
    const { friendId, friend } = createFriendDto;
    await this.addFriendToUser(createFriendDto, userDto);
    await this.addUserToFriend(createFriendDto, userDto);

    return { [friendId]: friend };
  }

  async findPotiential() {
    // TODO: work on this: create a cloud function to filter users already in current (requesting) user's friend list
    const usersSnapshot = await this.dbRef
      .child('users')
      .limitToLast(30)
      .once('value');

    return usersSnapshot.exists() ? usersSnapshot.val() : [];
  }

  async findById(userId: string) {
    const friendsSnapShot = await this.dbRef
      .child('friends')
      .child(userId)
      .once('value');

    return friendsSnapShot.exists() ? friendsSnapShot.val() : [];
  }

  async invite(data: InviteFriendsDto, userDto: UserDto) {
    const { mails } = data;
    const errors = [];

    for (let i = 0; i < mails.length; i++) {
      try {
        await this.emailService.sendInvite(mails[i], userDto);
      } catch (err) {
        errors.push({
          index: i,
          err,
        });
      }
    }
    // TODO: log error

    if (errors.length > 0)
      throw new InternalServerErrorException(errors.map(e => e.index));
  }

  private async addFriendToUser(
    createFriendDto: CreateFriendDto,
    userDto: UserDto,
  ) {
    return await this.dbRef
      .child('friends')
      .child(userDto.id)
      .child(createFriendDto.friendId)
      .set(createFriendDto.friend);
  }

  private async addUserToFriend(
    createFriendDto: CreateFriendDto,
    userDto: UserDto,
  ) {
    return await this.dbRef
      .child('friends')
      .child(createFriendDto.friendId)
      .child(userDto.id)
      .set({
        name: `${userDto.firstName} ${userDto.lastName}`,
      });
  }
}
