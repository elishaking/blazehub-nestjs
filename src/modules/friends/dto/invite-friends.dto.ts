import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { IMail } from '../../email/email.interface';

export class InviteFriendsDto {
  @ApiProperty()
  @IsArray()
  readonly mails: IMail[];

  constructor(mails: IMail[]) {
    this.mails = mails;
  }
}
