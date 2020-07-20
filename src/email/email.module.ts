import { Module } from '@nestjs/common';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { variables } from 'src/app/config';

@Module({
  imports: [
    MailerModule.forRoot({
      defaults: {
        secure: true,
      },
      transport: {
        service: variables.EMAIL_SERVICE,
        auth: {
          user: variables.EMAIL,
          pass: variables.EMAIL_PASSWORD,
        },
      },
      preview: variables.NODE_ENV !== 'production',
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
