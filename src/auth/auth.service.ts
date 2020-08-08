import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as app from 'firebase/app';
import 'firebase/database';
import * as bycrypt from 'bcrypt';
import { SigninDto, SignupDto, UserDto, TokenDto, SendLinkDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';
import { SigninResponseDto } from './dto/signin.dto';
import { getUserIdFromEmail } from './auth.util';
import {
  AuthResponse,
  EmailResponse,
} from 'src/app/constants/service-response';
import { PasswordResetDto } from './dto/password-reset.dto';
import { UsersService } from 'src/users/users.service';
import { TokenUrlService } from './token-url.service';

@Injectable()
export class AuthService {
  dbRef = app.database().ref();

  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenUrlService: TokenUrlService,
    private readonly userService: UsersService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.userService.create(signupDto);
    const res = await this.tokenUrlService.sendConfirmationUrl(user);

    // TODO: remove this
    if (res.statusCode !== 202)
      throw new InternalServerErrorException(EmailResponse.SEND_FAIL);

    return new UserDto(user);
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const userId = getUserIdFromEmail(email);
    const userRef = this.dbRef.child('users').child(userId);

    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists())
      throw new NotFoundException(AuthResponse.ACCOUNT_NOT_FOUND);

    const userValue = {
      id: userSnapshot.key,
      ...userSnapshot.val(),
    };
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
      id: user.id,
      email: user.email,
      username,
      confirmed: user.confirmed,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return new SigninResponseDto(accessToken);
  }

  async confirmUser(tokenDto: TokenDto) {
    const { token } = tokenDto;
    const userId = await this.tokenUrlService.validateToken(token, true);
    const userSnapshot = await this.fetchUserSnapshot(userId);
    const user = userSnapshot.val();
    if (user.confirmed)
      throw new UnprocessableEntityException(AuthResponse.ALREADY_CONFIRMED);

    userSnapshot.ref.child('confirmed').set(true);

    return {
      success: true,
      message: 'Your account has been confirmed',
    };
  }

  async resendConfirmationLink(sendLinkDto: SendLinkDto) {
    const { email } = sendLinkDto;
    const userId = getUserIdFromEmail(email);
    const userSnapshot = await this.fetchUserSnapshot(userId);

    const user = userSnapshot.val();
    if (user.confirmed)
      throw new UnprocessableEntityException(AuthResponse.ALREADY_CONFIRMED);

    const res = await this.tokenUrlService.sendConfirmationUrl(user);
    // TODO: remove this
    if (res.statusCode !== 202)
      throw new InternalServerErrorException(EmailResponse.SEND_FAIL);
  }

  async sendPasswordResetLink(sendLinkDto: SendLinkDto) {
    const userId = getUserIdFromEmail(sendLinkDto.email);
    const userSnapshot = await this.fetchUserSnapshot(userId);
    const user = userSnapshot.val();
    const res = await this.tokenUrlService.sendPasswordResetUrl(user);
    // TODO: remove this
    if (res.statusCode !== 202)
      throw new InternalServerErrorException(EmailResponse.SEND_FAIL);
  }

  async confirmPasswordResetLink(tokenDto: TokenDto) {
    const { token } = tokenDto;
    const userId = await this.tokenUrlService.validateToken(token);

    return {
      success: true,
      id: userId,
    };
  }

  async resetPassword(passwordResetDto: PasswordResetDto) {
    const { token, password } = passwordResetDto;
    const userId = await this.tokenUrlService.validateToken(token, true);
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
