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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';
import { SigninPayloadDto } from './dto/signin.dto';
import { getUserIdFromEmail } from './auth.util';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  dbRef = app.database().ref();

  constructor(private jwtService: JwtService) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const userId = getUserIdFromEmail(email);
    const userRef = this.dbRef.child('users').child(userId);

    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists())
      throw new NotFoundException(
        'Your account does not exist, please sign up',
      );

    const userValue = userSnapshot.val();
    const user = new UserDto(userValue);

    // user.confirmed may not exist for earlier users
    if (user.confirmed === false)
      throw new ForbiddenException('Your account has not been verified');

    const isPasswordValid = await this.validatePassword(
      password,
      userValue.password,
    );

    if (!isPasswordValid)
      throw new UnprocessableEntityException('Incorrect Password');

    const username = await this.getUsername(userId);
    const accessToken = await this.generateAuthToken({
      email: user.email,
      username,
    });

    return new SigninPayloadDto(accessToken, user);
  }

  private async generateAuthToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private async validatePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return bycrypt.compare(password, userPassword);
  }

  private async getUsername(userId: string): Promise<string> {
    const usernameSnapshot = await this.dbRef
      .child('profiles')
      .child(userId)
      .child('username')
      .once('value');

    return usernameSnapshot.val();
  }
}
