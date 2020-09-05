import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserDto } from '../../auth/dto';

export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  readonly friendId: string;

  @ApiProperty({ type: UserDto })
  @IsNotEmpty()
  readonly friend: UserDto;

  constructor(friendId: string, friend: UserDto) {
    this.friendId = friendId;
    this.friend = friend;
  }
}
