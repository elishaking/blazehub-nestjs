import { Injectable, BadRequestException } from '@nestjs/common';
import { Chance } from 'chance';
import * as app from 'firebase/app';
import 'firebase/database';

import { variables } from '../../app/config';
import { IUser } from '../users/users.interface';
import { EmailService } from '../email/email.service';
import { UrlError } from '../../app/constants/service-response';

@Injectable()
export class TokenUrlService {
  tokenRef = app.database().ref('tokens');

  constructor(private readonly emailService: EmailService) {}

  async sendConfirmationUrl(user: IUser) {
    try {
      const confirmationUrl = await this.generateUrl('confirm', user.id);

      return await this.emailService.sendConfirmation(user, confirmationUrl);
    } catch (err) {
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

      return await this.emailService.sendPasswordReset(user, passwordResetUrl);
    } catch (err) {
      return {
        statusCode: 500,
        body: '',
      };
    }
  }

  async validateToken(token: string, deleteAfterValidation = false) {
    const tokenDataSnapshot = await this.tokenRef.child(token).once('value');
    if (!tokenDataSnapshot.exists())
      throw new BadRequestException(UrlError.INVALID_URL);

    const tokenData = tokenDataSnapshot.val();
    if (tokenData.exp < Date.now()) {
      tokenDataSnapshot.ref.remove();

      throw new BadRequestException(UrlError.EXPIRED_URL);
    }

    if (deleteAfterValidation) tokenDataSnapshot.ref.remove();

    return tokenData.userId;
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
