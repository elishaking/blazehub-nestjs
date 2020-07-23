import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { FeedbackMailContext } from './email/email.interface';
import { variables, firebaseConfig } from './app/config';
import { FeedbackDto } from './dto/feedback.dto';
import { EmailResponse } from './app/constants/service-response';

@Injectable()
export class AppService {
  constructor(private emailService: EmailService) {}

  getRoot(): string {
    return 'Hello World!';
  }

  async sendFeedback(data: FeedbackDto) {
    const { name, message, email } = data;
    const context: FeedbackMailContext = {
      name,
      message,
      email,
    };

    try {
      const res = await this.emailService.sendFeedbackEmail({
        email: variables.FEEDBACK_MAIL as string,
        subject: 'BlazeHub | Feedback mail',
        context,
      });

      if (res[0].statusCode !== 202)
        throw new InternalServerErrorException(EmailResponse.SEND_FAIL);
    } catch (err) {
      throw new InternalServerErrorException(EmailResponse.SEND_FAIL);
    }
  }

  async getFirebaseConfig() {
    return firebaseConfig;
  }
}
