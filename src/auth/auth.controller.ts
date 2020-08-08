import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto, TokenDto, SendUrlDto } from './dto';
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
  resendConfirmationUrl(@Body() sendLinkDto: SendUrlDto) {
    return this.authService.resendConfirmationUrl(sendLinkDto);
  }

  @Post('/password/confirm')
  confirmPasswordResetUrl(@Body() tokenDto: TokenDto) {
    return this.authService.confirmPasswordResetUrl(tokenDto);
  }

  @Post('/password/reset')
  resetPassword(@Body() passwordResetDto: PasswordResetDto) {
    return this.authService.resetPassword(passwordResetDto);
  }
  @Post('/password/forgot')
  sendPasswordResetLink(@Body() sendLinkDto: SendUrlDto) {
    return this.authService.sendPasswordResetUrl(sendLinkDto);
  }
}
