import {
  Injectable,
  ForbiddenException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SigninDto, SignupDto, UserDto, TokenDto, SendUrlDto } from './dto';
import { JwtPayload } from './auth.interface';
import { SigninResponseDto } from './dto/signin.dto';
import { AuthError, EmailResponse } from 'src/app/constants/service-response';
import { PasswordResetDto } from './dto/password-reset.dto';
import { UsersService } from 'src/users/users.service';
import { TokenUrlService } from './token-url.service';
import { PasswordService } from './password.service';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenUrlService: TokenUrlService,
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async signup(signupDto: SignupDto) {
    const encryptedPassword = await this.passwordService.encryptPassword(
      signupDto.password,
    );
    const user = await this.userService.create({
      ...signupDto,
      password: encryptedPassword,
    });
    const res = await this.tokenUrlService.sendConfirmationUrl(user);

    // TODO: remove this
    if (res.statusCode !== 202)
      throw new InternalServerErrorException(EmailResponse.SEND_FAIL);

    return new UserDto(user);
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.userService.findByEmail(email);
    // user.confirmed may not exist for earlier users
    if (user.confirmed === false)
      throw new ForbiddenException(AuthError.NOT_CONFIRMED);

    await this.passwordService.validatePassword(password, user.password);
    const accessToken = this.generateAccessToken(user);

    return new SigninResponseDto(accessToken);
  }

  async confirmUser(tokenDto: TokenDto) {
    const { token } = tokenDto;
    const userId = await this.tokenUrlService.validateToken(token, true);
    const userSnapshot = await this.userService.findByIdSnapshot(userId);
    if (userSnapshot.val().confirmed)
      throw new UnprocessableEntityException(AuthError.ALREADY_CONFIRMED);

    userSnapshot.ref.child('confirmed').set(true);

    return {
      success: true,
      message: 'Your account has been confirmed',
    };
  }

  async resendConfirmationUrl(sendUrlDto: SendUrlDto) {
    const user = await this.userService.findByEmail(sendUrlDto.email);
    if (user.confirmed)
      throw new UnprocessableEntityException(AuthError.ALREADY_CONFIRMED);

    const res = await this.tokenUrlService.sendConfirmationUrl(user);
    // TODO: remove this
    if (res.statusCode !== 202)
      throw new InternalServerErrorException(EmailResponse.SEND_FAIL);
  }

  async sendPasswordResetUrl(sendUrlDto: SendUrlDto) {
    const user = await this.userService.findByEmail(sendUrlDto.email);
    const res = await this.tokenUrlService.sendPasswordResetUrl(user);
    // TODO: remove this
    if (res.statusCode !== 202)
      throw new InternalServerErrorException(EmailResponse.SEND_FAIL);
  }

  async confirmPasswordResetUrl(tokenDto: TokenDto) {
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
    const encryptedPassword = await this.passwordService.encryptPassword(
      password,
    );

    return this.userService.resetPassword(userId, encryptedPassword);
  }

  private generateAccessToken(user: IUser) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      confirmed: user.confirmed,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }
}
