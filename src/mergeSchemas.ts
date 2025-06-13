import { z, ZodObject, ZodRawShape } from 'zod';

/**
 * Deeply merges two Zod object schemas into one.
 *
 * @template A - The first Zod object shape.
 * @template B - The second Zod object shape.
 * @param a - The first Zod object schema.
 * @param b - The second Zod object schema.
 * @returns A new Zod object schema with merged shapes.
 *
 * @example
 * const a = z.object({ foo: z.string() });
 * const b = z.object({ bar: z.number() });
 * const merged = mergeSchemas(a, b); // { foo: string, bar: number }
 */
export function mergeSchemas<A extends ZodRawShape, B extends ZodRawShape>(
  a: ZodObject<A>,
  b: ZodObject<B>
): z.ZodObject<A & B> {
  return a.merge(b) as z.ZodObject<A & B>;
}
