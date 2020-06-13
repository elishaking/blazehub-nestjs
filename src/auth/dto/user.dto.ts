import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsBoolean()
  readonly confirmed: boolean;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  readonly username: string;

  constructor(user: any) {
    this.confirmed = user.confirmed || false;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
  }
}
