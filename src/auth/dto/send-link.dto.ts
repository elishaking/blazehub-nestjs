import { IsEmail } from 'class-validator';

export class SendLink {
  @IsEmail()
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}
