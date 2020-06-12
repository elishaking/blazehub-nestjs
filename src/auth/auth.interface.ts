export interface JwtPayload {
  email: string;
  username: string;
}

export interface User {
  confirmed: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}
