import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class FeedbackDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly message: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  constructor(name: string, message: string, email: string) {
    this.name = name;
    this.message = message;
    this.email = email;
  }
}
