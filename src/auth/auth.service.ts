import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
  ConflictException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';
import * as bycrypt from 'bcrypt';
import { Chance } from 'chance';
import { SigninDto, SignupDto, UserDto, TokenDto, SendLinkDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';
import { SigninPayloadDto } from './dto/signin.dto';
import { getUserIdFromEmail } from './auth.util';
import { AuthResponse } from 'src/app/constants/service-response';
import { PasswordResetDto } from './dto/password-reset.dto';
import { EmailService } from 'src/email/email.service';
import { variables } from 'src/app/config';

@Injectable()
export class AuthService {
  dbRef = app.database().ref();
  tokenRef = app.database().ref('tokens');

  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, firstName, lastName, password, gender } = signupDto;
    const userId = getUserIdFromEmail(email);
    const userRef = this.dbRef.child('users').child(userId);

    const userSnapshot = await userRef.once('value');
    if (userSnapshot.exists())
      throw new ConflictException(AuthResponse.ACCOUNT_CONFLICT);

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
      throw new NotFoundException(AuthResponse.ACCOUNT_NOT_FOUND);

    const userValue = userSnapshot.val();
    const user = new UserDto(userValue);

    // user.confirmed may not exist for earlier users
    if (user.confirmed === false)
      throw new ForbiddenException(AuthResponse.NOT_CONFIRMED);

    const isPasswordValid = await this.validatePassword(
      password,
      userValue.password,
    );

    if (!isPasswordValid)
      throw new UnprocessableEntityException(AuthResponse.INCORRECT_PASSWORD);

    const username = await this.getUsername(userId);
    const accessToken = await this.generateAuthToken({
      email: user.email,
      username,
      confirmed: user.confirmed,
    });

    const confirmationLink = this.generateLink('confirm');
    this.emailService.sendConfirmationEmail({
      email: user.email,
      subject: 'BlazeHub: Verify your account 🤗🤗🤗',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        link: confirmationLink,
      },
      template: 'confirm',
    });

    return new SigninPayloadDto(accessToken, user);
  }

  async confirmUser(tokenDto: TokenDto) {
    const { token } = tokenDto;
    const userId = await this.validateToken(token, true);

    const userSnapshot = await this.fetchUserSnapshot(userId);

    const user = userSnapshot.val();
    if (user.confirmed)
      throw new UnprocessableEntityException(AuthResponse.ALREADY_CONFIRMED);

    userSnapshot.ref.child('confirmed').set(true);
  }

  async resendConfirmationLink(sendLinkDto: SendLinkDto) {
    const { email } = sendLinkDto;
    const userId = getUserIdFromEmail(email);
    const userSnapshot = await this.fetchUserSnapshot(userId);

    const user = userSnapshot.val();
    if (user.confirmed)
      throw new UnprocessableEntityException(AuthResponse.ALREADY_CONFIRMED);

    // TODO: create method to send confirmation link
    // this.sendConfirmationLink()
  }

  async sendPasswordResetLink(sendLinkDto: SendLinkDto) {
    const { email } = sendLinkDto;
    const userId = getUserIdFromEmail(email);
    const userSnapshot = await this.fetchUserSnapshot(userId);
    const user = userSnapshot.val();

    const resetLink = this.generateLink('password/reset');

    const info = await this.emailService.sendPasswordResetEmail({
      email,
      subject: 'BlazeHub: Reset Password 🔑🔑🔑',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        link: resetLink,
      },
      template: 'password-reset',
    });
    console.log(info);

    return HttpStatus.OK;
  }

  async confirmPasswordResetLink(tokenDto: TokenDto) {
    const { token } = tokenDto;
    const userId = await this.validateToken(token);

    await this.fetchUserSnapshot(userId);
  }

  async resetPassword(passwordResetDto: PasswordResetDto) {
    const { token, password } = passwordResetDto;
    const userId = await this.validateToken(token, true);
    const userSnapshot = await this.fetchUserSnapshot(userId);
    const hash = await this.generateHashedPassword(password);
    await userSnapshot.ref.child('password').set(hash);
  }

  private async fetchUserSnapshot(userId: string) {
    const userSnapshot = await this.dbRef
      .child('users')
      .child(userId)
      .once('value');

    if (!userSnapshot.exists())
      throw new NotFoundException(AuthResponse.ACCOUNT_NOT_FOUND);

    return userSnapshot;
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

  private async validateToken(token: string, deleteAfterValidation = false) {
    const tokenDataSnapshot = await this.tokenRef.child(token).once('value');

    if (!tokenDataSnapshot.exists())
      throw new BadRequestException(AuthResponse.INVALID_LINK);

    const tokenData = tokenDataSnapshot.val();
    if (tokenData.exp < Date.now()) {
      tokenDataSnapshot.ref.remove();

      throw new BadRequestException(AuthResponse.EXPIRED_LINK);
    }

    if (deleteAfterValidation) tokenDataSnapshot.ref.remove();

    return tokenData.userID;
  }

  private generateLink(basePath: 'password/reset' | 'confirm') {
    const chance = new Chance();
    const token = chance.hash();

    return `${variables.FRONTEND_URL}/auth/${basePath}/${token}`;
  }
}
