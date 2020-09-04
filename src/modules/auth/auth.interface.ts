export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  confirmed: boolean;
  firstName: string;
  lastName: string;
}
