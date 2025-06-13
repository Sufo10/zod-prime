import { ZodError } from 'zod';

/**
 * Flattens a ZodError into an array of readable error objects.
 *
 * @param error - The ZodError instance.
 * @returns An array of objects with `path` and `message` for each error.
 *
 * @example
 * try { schema.parse(data); } catch (e) { const flat = flattenErrors(e); }
 */
export function flattenErrors(error: ZodError) {
  return error.errors.map((e) => ({
    path: e.path.map(String).join('.'),
    message: e.message,
  }));
}
