import { Module } from '@nestjs/common';
// import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

import { EmailService } from './email.service';
import { variables } from '../../app/config';

@Module({
  imports: [
    // MailerModule.forRoot({
    //   defaults: {
    //     secure: true,
    //   },
    //   transport: {
    //     service: variables.EMAIL_SERVICE,
    //     auth: {
    //       user: variables.EMAIL,
    //       pass: variables.EMAIL_PASSWORD,
    //     },
    //   },
    //   preview: variables.NODE_ENV !== 'production',
    //   template: {
    //     dir: __dirname + '/templates',
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
    SendGridModule.forRoot({
      apiKey: variables.SENDGRID_API_KEY,
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
