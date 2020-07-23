interface MailContext {
  firstName: string;
  lastName: string;
  link: string;
}

export interface FeedbackMailContext {
  name: string;
  message: string;
  email: string;
}

interface MailData {
  email: string;
  subject: string;
  context: MailContext;
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

export interface FeedbackMailData {
  template: 'feedback';
  email: string;
  subject: string;
  context: FeedbackMailContext;
}
