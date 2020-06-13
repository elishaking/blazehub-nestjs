import { Controller, Body, Post, Get, Param, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto, InviteFriendsDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard())
  @Get('/:userId')
  fetchFriends(@Param('userId') userId: string) {
    return this.friendsService.fetchFriends(userId);
  }

  @UseGuards(AuthGuard())
  @Post('/create')
  createFriend(@Body() createFriendDto: CreateFriendDto) {
    return this.friendsService.createFriend(createFriendDto);
  }

  @UseGuards(AuthGuard())
  @Post('/invite')
  inviteFriends(@Body() inviteFriendsDto: InviteFriendsDto) {
    return this.friendsService.inviteFriends(inviteFriendsDto);
  }
}
