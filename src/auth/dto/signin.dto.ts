export class SigninDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class SigninPayloadDto {
  accessToken: string;
  user: any;

  constructor(accessToken: string, user: any) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
