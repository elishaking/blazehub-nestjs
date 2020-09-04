import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FeedbackDto } from './dto/feedback.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return this.appService.getRoot();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/firebase/config')
  getFirebaseConfig() {
    return this.appService.getFirebaseConfig();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/feedback')
  sendFeedback(@Body() feedbackDto: FeedbackDto) {
    return this.appService.sendFeedback(feedbackDto);
  }
}
