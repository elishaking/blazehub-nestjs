export interface IMail {
  email: string;
  name: string;
}

export interface FeedbackMailContext {
  name: string;
  message: string;
  email: string;
}

export interface FeedbackMailData {
  email: string;
  subject: string;
  context: FeedbackMailContext;
}
