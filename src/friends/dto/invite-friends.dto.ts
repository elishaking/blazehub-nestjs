import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

interface Email {
  email: string;
  name: string;
}

export class InviteFriendsDto {
  @ApiProperty()
  @IsArray()
  readonly mails: Email[];

  constructor(mails: Email[]) {
    this.mails = mails;
  }
}
