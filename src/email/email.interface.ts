export interface IMail {
  email: string;
  name: string;
}

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

interface InviteMailContext {
  firstName: string;
  lastName: string;
  receiver: string;
  link: string;
}

export interface MailData {
  email: string;
  subject: string;
  context: MailContext;
}

export interface InviteMailData {
  email: string;
  subject: string;
  context: InviteMailContext;
}

export interface FeedbackMailData {
  email: string;
  subject: string;
  context: FeedbackMailContext;
}
