import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class SigninPayloadDto {
  accessToken: string;
  user: any;

  constructor(accessToken: string, user: any) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
