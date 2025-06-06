export function isEmailOrPhone(identifier: string): 'email' | 'phone' | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (emailRegex.test(identifier)) return 'email';
  if (phoneRegex.test(identifier)) return 'phone';
  return null;
}
