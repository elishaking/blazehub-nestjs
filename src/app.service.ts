import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return 'Hello World!';
  }

  async sendFeedback(data: any) {
    // await sendFeedbackMail(data);
  }
}
