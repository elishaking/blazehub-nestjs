export enum AuthResponse {
  ACCOUNT_NOT_FOUND = 'Your account does not exist, please sign up',
  ACCOUNT_CONFLICT = 'Your account already exists, please sign in',
  ALREADY_CONFIRMED = 'You have already been verified, proceed to sign in',
  NOT_CONFIRMED = 'Your account has not been verified',
  INCORRECT_PASSWORD = 'Incorrect password',
  INVALID_LINK = 'Invalid link',
  EXPIRED_LINK = 'Expired link',
}
