import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailData, FeedbackMailData, InviteMailData } from './email.interface';
import { variables } from 'src/app/config';

@Injectable()
export class EmailService {
  constructor(@InjectSendGrid() private sendGridService: SendGridService) {}

  sendConfirmationEmail(data: MailData) {
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

  sendPasswordResetEmail(data: MailData) {
    return this.sendGridService.send({
      from: variables.EMAIL,
      to: data.email,
      subject: data.subject,
      templateId: 'd-92af2cb2c498469889d0dd88571bb7e3',
      dynamicTemplateData: {
        name: `${data.context.firstName} ${data.context.lastName}`,
        link: data.context.link,
      },
    });
  }

  sendInviteEmail(data: InviteMailData) {
    return this.sendGridService.send({
      from: variables.EMAIL,
      to: data.email,
      subject: data.subject,
      templateId: 'd-e638b58be8ab458bb35b683fd459f940',
      dynamicTemplateData: {
        name: data.context.receiver || 'there',
        link: data.context.link,
        user: `${data.context.firstName} ${data.context.lastName}`,
      },
    });
  }

  sendFeedbackEmail(data: FeedbackMailData) {
    return this.sendGridService.send({
      from: variables.EMAIL,
      to: data.email,
      subject: data.subject,
      templateId: 'd-cc0c3d1b8d3348fbad33e709c55b23a8',
      dynamicTemplateData: {
        name: data.context.name,
        message: data.context.message,
        email: data.context.email,
      },
    });
  }
}
