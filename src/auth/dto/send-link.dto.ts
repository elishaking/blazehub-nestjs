import { IsEmail } from 'class-validator';

export class SendLinkDto {
  @IsEmail()
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}
