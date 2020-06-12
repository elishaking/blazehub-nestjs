import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto, TokenDto, SendLinkDto } from './dto';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('/confirm')
  confirmUser(@Body() tokenDto: TokenDto) {
    return this.authService.confirmUser(tokenDto);
  }

  @Post('/confirm/resend')
  resendConfirmationLink(sendLinkDto: SendLinkDto) {
    return this.authService.resendConfirmationLink(sendLinkDto);
  }

  @Post('/password/confirm')
  confirmPasswordResetLink(tokenDto: TokenDto) {
    return this.authService.confirmPasswordResetLink(tokenDto);
  }

  @Post('/password/reset')
  resetPassword(passwordResetDto: PasswordResetDto) {
    return this.authService.resetPassword(passwordResetDto);
  }
  @Post('/password/forgot')
  sendPasswordResetLink(sendLinkDto: SendLinkDto) {
    return this.authService.sendPasswordResetLink(sendLinkDto);
  }
}
