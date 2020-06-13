import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class InviteFriendsDto {
  @ApiProperty()
  @IsArray()
  readonly emails: string[];

  constructor(emails: string[]) {
    this.emails = emails;
  }
}
