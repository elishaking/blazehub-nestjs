import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';

import { SignupDto } from '../auth/dto';
import { UserError } from '../../app/constants/service-response';
import { IUser } from './users.interface';
import { FriendsService } from '../friends/friends.service';

@Injectable()
export class UsersService {
  usersRef = app.database().ref('users');

  constructor(private readonly friendService: FriendsService) {}

  async create(signupDto: SignupDto): Promise<IUser> {
    const userId = this.generateUserId(signupDto.email);
    const userRef = this.usersRef.child(userId);
    const userSnapshot = await userRef.once('value');
    if (userSnapshot.exists()) throw new ConflictException(UserError.CONFLICT);

    // TODO: (migration): add username to all existing users
    const { firstName, lastName } = signupDto;
    const username = await this.generateUsername(firstName, lastName);
    const newUser = {
      ...signupDto,
      id: userId,
      username,
      password: 'hashedPassword',
      confirmed: false,
    };

    await userRef.set(newUser);
    await this.friendService.addBlazeBot(userId);
    await this.createProfile(newUser);

    return newUser;
  }

  async findById(userId: string): Promise<IUser> {
    const userSnapshot = await this.usersRef.child(userId).once('value');
    if (!userSnapshot.exists())
      throw new NotFoundException(UserError.NOT_FOUND);

    return userSnapshot.val();
  }

  async findByIdSnapshot(userId: string) {
    const userSnapshot = await this.usersRef.child(userId).once('value');
    if (!userSnapshot.exists())
      throw new NotFoundException(UserError.NOT_FOUND);

    return userSnapshot;
  }

  async findByEmail(email: string): Promise<IUser> {
    const userId = this.generateUserId(email);
    const userRef = this.usersRef.child(userId);
    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists())
      throw new NotFoundException(UserError.NOT_FOUND);

    return userSnapshot.val();
  }

  async findByEmailSnapshot(email: string) {
    const userId = this.generateUserId(email);
    const userSnapshot = await this.usersRef.child(userId).once('value');

    return userSnapshot;
  }

  async resetPassword(userId: string, newPassword: string) {
    const userSnapshot = await this.findByIdSnapshot(userId);

    return await userSnapshot.ref.child('password').set(newPassword);
  }

  private generateUserId(email: string): string {
    return email.replace(/\./g, '~').replace(/@/g, '~~');
  }

  private async generateUsername(firstName: string, lastName: string) {
    const username = `${firstName.replace(/ /g, '')}.${lastName.replace(
      / /g,
      '',
    )}`.toLowerCase();

    const userSnapshot = await this.usersRef
      .orderByChild('username')
      .equalTo(username)
      .limitToFirst(1)
      .once('value');

    if (userSnapshot.exists())
      return `${username}-${Date.now()
        .toString()
        .substring(7)}`;

    return username;
  }

  private async createProfile({ id, username }: IUser) {
    await app
      .database()
      .ref('profiles')
      .child(id)
      .child('username')
      .set(username);
  }
}
