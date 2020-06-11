export function getUserIdFromEmail(email: string): string {
  return email.replace(/\./g, '~').replace(/@/g, '~~');
}
