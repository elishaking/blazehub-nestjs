import { Module } from '@nestjs/common';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { variables } from 'src/app/config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: variables.EMAIL_SERVICE,
        auth: {
          user: variables.EMAIL,
          pass: variables.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: 'BlazeHub',
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
