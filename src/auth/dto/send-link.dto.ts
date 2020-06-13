import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendLinkDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}
