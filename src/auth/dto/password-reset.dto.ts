import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class PasswordResetDto {
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
