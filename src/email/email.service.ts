import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import {
  ConfirmationMailData,
  PasswordResetMailData,
  InviteMailData,
  FeedbackMailData,
} from './email.interface';
import { variables } from 'src/app/config';

@Injectable()
export class EmailService {
  constructor(@InjectSendGrid() private sendGridService: SendGridService) {}

  sendConfirmationEmail(data: ConfirmationMailData) {
    console.log(data.context.link);
    return this.sendGridService.send({
      from: variables.EMAIL,
      to: data.email,
      subject: data.subject,
      templateId: 'd-87162eaf8190473788f6146f3e4ae524',
      dynamicTemplateData: {
        name: `${data.context.firstName} ${data.context.lastName}`,
        link: data.context.link,
      },
    });
  }

  sendPasswordResetEmail(data: PasswordResetMailData) {
    return this.sendGridService.send({
      to: data.email,
      subject: data.subject,
      dynamicTemplateData: data.context,
    });
  }

  sendInviteEmail(data: InviteMailData) {
    return this.sendGridService.send({
      to: data.email,
      subject: data.subject,
      dynamicTemplateData: data.context,
    });
  }

  sendFeedbackEmail(data: FeedbackMailData) {
    return this.sendGridService.send({
      to: data.email,
      subject: data.subject,
      dynamicTemplateData: data.context,
    });
  }
}
