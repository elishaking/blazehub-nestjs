import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto, InviteFriendsDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserDto } from 'src/auth/dto';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard())
  @Get()
  fetchPotientialFriends() {
    return this.friendsService.fetchPotientialFriends();
  }

  @UseGuards(AuthGuard())
  @Get()
  fetchFriends(@GetUser() user: UserDto) {
    return this.friendsService.fetchFriends(user.id);
  }

  @UseGuards(AuthGuard())
  @Post('/add')
  createFriend(
    @Body() createFriendDto: CreateFriendDto,
    @GetUser() user: UserDto,
  ) {
    return this.friendsService.createFriend(createFriendDto, user);
  }

  @UseGuards(AuthGuard())
  @Post('/invite')
  inviteFriends(
    @Body() inviteFriendsDto: InviteFriendsDto,
    @GetUser() user: UserDto,
  ) {
    return this.friendsService.inviteFriends(inviteFriendsDto, user);
  }
}
