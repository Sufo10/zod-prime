import { z, ZodTypeAny } from 'zod';

/**
 * Sets a default value for a Zod schema.
 *
 * @template T - The Zod schema type.
 * @param schema - The Zod schema to set a default for.
 * @param defaultValue - The default value to use.
 * @returns The Zod schema with a default value.
 *
 * @example
 * const schema = zodDefault(z.string(), 'hello');
 * schema.parse(undefined); // 'hello'
 */
export function zodDefault<T extends ZodTypeAny>(schema: T, defaultValue: z.infer<T>): T {
  return schema.default(defaultValue) as any;
}
