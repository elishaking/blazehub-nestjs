import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { FeedbackDto } from './dto/feedback.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return this.appService.getRoot();
  }

  @Get('/firebase/config')
  getFirebaseConfig() {
    return this.appService.getFirebaseConfig();
  }

  @Post('/feedback')
  sendFeedback(@Body() feedbackDto: FeedbackDto) {
    return this.appService.sendFeedback(feedbackDto);
  }
}
