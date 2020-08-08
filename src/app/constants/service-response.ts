export enum AuthError {
  ACCOUNT_NOT_FOUND = 'Your account does not exist, please sign up',
  ACCOUNT_CONFLICT = 'Your account already exists, please sign in',
  ALREADY_CONFIRMED = 'You have already been verified, proceed to sign in',
  NOT_CONFIRMED = 'Your account has not been verified',
  INCORRECT_PASSWORD = 'Incorrect password',
}

export enum UserError {
  CONFLICT = 'Your account already exists, please sign in',
}

export enum UrlError {
  INVALID_URL = 'Url is invalid',
  EXPIRED_URL = 'Url has expired',
}

export enum EmailResponse {
  SEND_FAIL = 'Could not send email to the specified address',
}
