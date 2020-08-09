import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateFriendDto, InviteFriendsDto } from './dto';
import { UserDto } from 'src/auth/dto';
import { FriendsService } from './friends.service';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard())
  @Get()
  find(@GetUser() user: UserDto) {
    return this.friendsService.findById(user.id);
  }

  @UseGuards(AuthGuard())
  @Get('/new')
  fetchPotiential() {
    return this.friendsService.findPotiential();
  }

  @UseGuards(AuthGuard())
  @Post('/add')
  create(@Body() createFriendDto: CreateFriendDto, @GetUser() user: UserDto) {
    return this.friendsService.create(createFriendDto, user);
  }

  @UseGuards(AuthGuard())
  @Post('/invite')
  invite(@Body() inviteFriendsDto: InviteFriendsDto, @GetUser() user: UserDto) {
    return this.friendsService.invite(inviteFriendsDto, user);
  }
}
