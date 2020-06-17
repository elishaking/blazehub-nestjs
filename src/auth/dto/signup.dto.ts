import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsIn } from 'class-validator';

type GenderType = 'Male' | 'Female' | 'Other';

export class SignupDto {
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
  readonly password: string;

  @ApiProperty()
  @IsIn(['Male', 'Female', 'Other'])
  readonly gender: GenderType;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    gender: GenderType,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.gender = gender;
  }
}
