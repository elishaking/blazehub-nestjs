import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsString()
  readonly friendId: string;

  @ApiProperty()
  readonly friend: any;

  @ApiProperty()
  readonly user: any;

  constructor(userId: string, friendId: string, friend: any, user: any) {
    this.userId = userId;
    this.friendId = friendId;
    this.friend = friend;
    this.user = user;
  }
}
