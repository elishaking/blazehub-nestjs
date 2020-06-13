interface MailData {
  email: string;
  subject: string;
  context: {
    firstName: string;
    lastName: string;
    link: string;
  };
}

export interface PasswordResetMailData extends MailData {
  template: 'password-reset';
}

export interface ConfirmationMailData extends MailData {
  template: 'confirm';
}

export interface InviteMailData extends MailData {
  template: 'invite';
}
