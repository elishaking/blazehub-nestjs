import { Injectable } from '@nestjs/common';
import { Chance } from 'chance';
import * as app from 'firebase/app';
import 'firebase/database';

import { variables } from '../app/config';
import { IUser } from 'src/users/users.interface';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TokenUrlService {
  tokenRef = app.database().ref('tokens');

  constructor(private readonly emailService: EmailService) {}

  async sendConfirmationUrl(user: IUser) {
    try {
      const confirmationUrl = await this.generateUrl('confirm', user.id);

      return await this.emailService.sendConfirmationEmail(
        user,
        confirmationUrl,
      );
    } catch (err) {
      console.error(err);

      return {
        statusCode: 500,
        body: '',
      };
    }
  }

  async sendPasswordResetUrl(user: IUser) {
    try {
      const passwordResetUrl = await this.generateUrl(
        'password/reset',
        user.id,
      );

      return await this.emailService.sendPasswordResetEmail(
        user,
        passwordResetUrl,
      );
    } catch (err) {
      console.error(err);

      return {
        statusCode: 500,
        body: '',
      };
    }
  }

  private async generateUrl(
    basePath: 'password/reset' | 'confirm',
    userId: string,
  ) {
    const chance = new Chance();
    const token = chance.hash();

    const tokenData = {
      token,
      userId,
      exp: Date.now() + 60 * 60 * 1000,
    };

    await this.tokenRef.child(token).set(tokenData);

    return `${variables.FRONTEND_URL}/${basePath}/${token}`;
  }
}
