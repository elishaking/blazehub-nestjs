import { GenderType } from '../auth/dto';

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
