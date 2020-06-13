import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class InviteFriendsDto {
  @ApiProperty()
  @IsArray()
  readonly emails: string[];

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  constructor(emails: string[], firstName: string, lastName: string) {
    this.emails = emails;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
