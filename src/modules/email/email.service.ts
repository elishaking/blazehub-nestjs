import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

import { FeedbackMailData, IMail } from './email.interface';
import { variables } from '../../app/config';
import { IUser } from '../users/users.interface';
import { UserDto } from '../auth/dto';

@Injectable()
export class EmailService {
  constructor(@InjectSendGrid() private sendGridService: SendGridService) {}

  async sendConfirmation(user: IUser, url: string) {
    const [res] = await this.sendGridService.send({
      from: variables.EMAIL,
      to: user.email,
      subject: 'BlazeHub: Verify your account 🤗🤗🤗',
      templateId: 'd-87162eaf8190473788f6146f3e4ae524',
      dynamicTemplateData: {
        name: `${user.firstName} ${user.lastName}`,
        link: url,
      },
    });

    return {
      statusCode: res.statusCode,
      body: res.body,
    };
  }

  async sendPasswordReset(user: IUser, url: string) {
    const [res] = await this.sendGridService.send({
      from: variables.EMAIL,
      to: user.email,
      subject: 'BlazeHub: Reset Password 🔑🔑🔑',
      templateId: 'd-92af2cb2c498469889d0dd88571bb7e3',
      dynamicTemplateData: {
        name: `${user.firstName} ${user.lastName}`,
        link: url,
      },
    });

    return {
      statusCode: res.statusCode,
      body: res.body,
    };
  }

  sendInvite({ email, name }: IMail, userDto: UserDto) {
    return this.sendGridService.send({
      from: variables.EMAIL,
      to: email,
      subject: `From ${userDto.firstName} | Hi, Join me on BlazeHub`,
      templateId: 'd-e638b58be8ab458bb35b683fd459f940',
      dynamicTemplateData: {
        name: name || 'there',
        link: 'https://blazehub.skyblazar.com',
        user: `${userDto.firstName} ${userDto.lastName}`,
      },
    });
  }

  sendFeedback(data: FeedbackMailData) {
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
