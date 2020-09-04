import { GenderType } from 'src/modules/auth/dto';

export interface IUser {
  id: string;
  username: string;
  password: string;
  confirmed: boolean;
  email: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
}
