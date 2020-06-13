export interface JwtPayload {
  email: string;
  username: string;
  confirmed: boolean;
  exp: number;
}
