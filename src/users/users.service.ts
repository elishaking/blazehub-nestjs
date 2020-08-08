import { Injectable, ConflictException } from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';

import { SignupDto } from 'src/auth/dto';
import { UserError } from 'src/app/constants/service-response';

@Injectable()
export class UsersService {
  usersRef = app.database().ref('users');

  async create(signupDto: SignupDto) {
    const userId = this.generateUserId(signupDto.email);
    const userRef = this.usersRef.child(userId);
    const userSnapshot = await userRef.once('value');
    if (userSnapshot.exists()) throw new ConflictException(UserError.CONFLICT);

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
    // TODO: initializeNewUser

    return newUser;
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
}
