import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserDto } from 'src/auth/dto';

export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsString()
  readonly friendId: string;

  @ApiProperty({ type: UserDto })
  readonly friend: UserDto;

  @ApiProperty()
  @IsString()
  readonly name: string;

  constructor(userId: string, friendId: string, friend: UserDto, name: string) {
    this.userId = userId;
    this.friendId = friendId;
    this.friend = friend;
    this.name = name;
  }
}
