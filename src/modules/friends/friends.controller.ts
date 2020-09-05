import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateFriendDto, InviteFriendsDto } from './dto';
import { UserDto } from '../auth/dto';
import { FriendsService } from './friends.service';
import { GetUser } from '../auth/get-user.decorator';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  find(@GetUser() user: UserDto) {
    return this.friendsService.findById(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/new')
  fetchPotiential() {
    return this.friendsService.findPotiential();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  create(@Body() createFriendDto: CreateFriendDto, @GetUser() user: UserDto) {
    return this.friendsService.create(createFriendDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/invite')
  invite(@Body() inviteFriendsDto: InviteFriendsDto, @GetUser() user: UserDto) {
    return this.friendsService.invite(inviteFriendsDto, user);
  }
}
