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
