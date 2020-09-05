import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bycrypt from 'bcrypt';

import { PasswordError } from '../../app/constants/service-response';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string) {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    return hashedPassword;
  }

  async validatePassword(password: string, encrypted: string) {
    const isPasswordValid = await bycrypt.compare(password, encrypted);
    if (!isPasswordValid) throw new ForbiddenException(PasswordError.INCORRECT);
  }
}
