import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { FeedbackMailContext } from './email/email.interface';
import { variables } from './app/config';

@Injectable()
export class AppService {
  constructor(private emailService: EmailService) {}

  getRoot(): string {
    return 'Hello World!';
  }

  async sendFeedback(data: any) {
    const { name, message, email } = data;
    const context: FeedbackMailContext = {
      name,
      message,
      email,
    };

    await this.emailService.sendFeedbackEmail({
      email: variables.FEEDBACK_MAIL as string,
      subject: 'BlazeHub | Feedback mail',
      context,
      template: 'feedback',
    });
  }
}
