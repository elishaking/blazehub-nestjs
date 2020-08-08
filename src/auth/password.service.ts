import { Injectable } from '@nestjs/common';
import * as bycrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string) {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    return hashedPassword;
  }

  async validatePassword(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return bycrypt.compare(password, encrypted);
  }
}
