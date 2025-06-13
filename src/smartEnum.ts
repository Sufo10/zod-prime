import { z } from 'zod';

/**
 * Creates a type-safe Zod enum from a readonly string array.
 *
 * @template T - The tuple of string literals.
 * @param values - The string values for the enum.
 * @returns A Zod enum schema.
 *
 * @example
 * const Color = smartEnum(['red', 'green', 'blue'] as const);
 * type ColorType = z.infer<typeof Color>; // 'red' | 'green' | 'blue'
 */
export function smartEnum<const T extends readonly [string, ...string[]]>(values: T) {
  return z.enum(values);
}
