import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';
import * as bycrypt from 'bcrypt';
import { SigninDto, SignupDto, UserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';
import { SigninPayloadDto } from './dto/signin.dto';
import { getUserIdFromEmail } from './auth.util';

@Injectable()
export class AuthService {
  dbRef = app.database().ref();

  constructor(private jwtService: JwtService) {}

  async signup(signupDto: SignupDto) {
    const { email, firstName, lastName, password, gender } = signupDto;
    const userId = getUserIdFromEmail(email);
    const userRef = this.dbRef.child('users').child(userId);

    const userSnapshot = await userRef.once('value');
    if (userSnapshot.exists())
      throw new ConflictException(
        'Your account already exists, please sign in',
      );

    const hashedPassword = await this.generateHashedPassword(password);
    const username = await this.generateUsername(firstName, lastName);

    const newUser = {
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
      confirmed: false,
      gender: gender || 'Other',
    };
    await userRef.set(newUser);
    await this.initializeNewUser(userId, username);

    return new UserDto(newUser);
  }

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
      confirmed: user.confirmed,
    });

    return new SigninPayloadDto(accessToken, user);
  }

  private async generateAuthToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private async generateHashedPassword(password: string) {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    return hashedPassword;
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

  private async generateUsername(firstName: string, lastName: string) {
    const username = `${firstName.replace(/ /g, '')}.${lastName.replace(
      / /g,
      '',
    )}`.toLowerCase();

    const userSnapshot = await this.dbRef
      .child('users')
      .orderByChild('username')
      .equalTo(username)
      .limitToFirst(1)
      .once('value');

    if (userSnapshot.exists()) return username + Date.now().toString();

    return username;
  }

  private async initializeNewUser(userId: string, username: string) {
    const data = {
      blazebot: {
        name: 'BlazeBot',
      },
    };

    await this.dbRef
      .child('friends')
      .child(userId)
      .set(data);

    await this.dbRef
      .child('profiles')
      .child(userId)
      .child('username')
      .set(username);
  }
}
