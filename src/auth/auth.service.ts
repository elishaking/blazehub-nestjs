import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';
import * as bycrypt from 'bcrypt';
import { SigninDto } from './dto';

@Injectable()
export class AuthService {
  dbRef = app.database().ref();

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const userKey = email.replace(/\./g, '~').replace(/@/g, '~~');
    const userRef = this.dbRef.child('users').child(userKey);

    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists())
      throw new NotFoundException(
        'Your account does not exist, please sign up',
      );

    const user = userSnapshot.val();

    // user.confirmed may not exist for earlier users
    if (user.confirmed === false)
      throw new ForbiddenException('Your account has not been verified');

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnprocessableEntityException('Incorrect Password');

    return user;
  }

  private async validatePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return bycrypt.compare(password, userPassword);
  }
}
