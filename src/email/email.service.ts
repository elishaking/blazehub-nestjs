import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ConfirmationMailData,
  PasswordResetMailData,
  InviteMailData,
  FeedbackMailData,
} from './email.interface';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  sendConfirmationEmail(data: ConfirmationMailData) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      template: data.template,
      context: data.context,
    });
  }

  sendPasswordResetEmail(data: PasswordResetMailData) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      template: data.template,
      context: data.context,
    });
  }

  sendInviteEmail(data: InviteMailData) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      template: data.template,
      context: data.context,
    });
  }

  sendFeedbackEmail(data: FeedbackMailData) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      template: data.template,
      context: data.context,
    });
  }
}
