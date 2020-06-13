import { Controller, Body, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('/create')
  createFriend(@Body() createFriendDto: CreateFriendDto) {
    return this.friendsService.createFriend(createFriendDto);
  }
}
