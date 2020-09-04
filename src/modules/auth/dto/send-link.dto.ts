import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendUrlDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}
