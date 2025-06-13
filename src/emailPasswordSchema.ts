import { z } from 'zod';

/**
 * Options for the emailPasswordSchema utility.
 * @property minPasswordLength - Minimum password length (default: 8)
 * @property requireSpecialChar - Require at least one special character in the password
 */
export interface EmailPasswordOptions {
  minPasswordLength?: number;
  requireSpecialChar?: boolean;
}

/**
 * Generates a Zod schema for an email and password object, with flexible password rules.
 *
 * @param options - Options for password requirements.
 * @returns A Zod object schema with `email` and `password` fields.
 *
 * @example
 * const schema = emailPasswordSchema({ minPasswordLength: 10, requireSpecialChar: true });
 * schema.parse({ email: 'a@b.com', password: 'abc123!@#' });
 */
export function emailPasswordSchema(options?: EmailPasswordOptions): z.ZodObject<{
  email: z.ZodString;
  password: z.ZodString;
}> {
  let password = z.string().min(options?.minPasswordLength || 8);
  if (options?.requireSpecialChar) {
    password = password.regex(/[^a-zA-Z0-9]/, 'Password must contain a special character');
  }
  return z.object({
    email: z.string().email(),
    password,
  });
}
