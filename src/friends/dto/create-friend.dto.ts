import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';
import { UserDto } from 'src/auth/dto';

export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsString()
  readonly friendId: string;

  @ApiProperty({ type: UserDto })
  @IsObject({
    context: UserDto,
  })
  readonly friend: any;

  @ApiProperty()
  @IsString()
  readonly name: string;

  constructor(userId: string, friendId: string, friend: any, name: string) {
    this.userId = userId;
    this.friendId = friendId;
    this.friend = friend;
    this.name = name;
  }
}
