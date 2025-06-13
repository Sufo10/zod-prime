import { z, ZodTypeAny } from 'zod';

/**
 * Type-level utility: Recursively omits keys from a type.
 */
export type DeepOmit<T, K extends string> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepOmit<U, K>>
    : T extends Map<infer MK, infer MV>
    ? Map<MK, DeepOmit<MV, K>>
    : T extends Record<string, any>
    ? { [P in Exclude<keyof T, K>]: DeepOmit<T[P], K> }
    : T
  : T;

/**
 * Recursively omits keys from a Zod schema, deeply.
 *
 * @template T - The Zod schema type.
 * @template K - The keys to omit (string union).
 * @param schema - The Zod schema to omit keys from.
 * @param keys - The keys to omit (as a string array).
 * @returns A new Zod schema with the specified keys omitted, deeply.
 *
 * @example
 * const schema = z.object({ a: z.string(), b: z.object({ c: z.number() }) });
 * const omitted = deepOmit(schema, ['b']);
 */
export function deepOmit<T extends ZodTypeAny, K extends string>(
  schema: T,
  keys: readonly K[]
): z.ZodType<DeepOmit<z.infer<T>, K>> {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const newShape: Record<string, ZodTypeAny> = {};
    for (const key in shape) {
      if (!keys.includes(key as K)) {
        newShape[key] = deepOmit(shape[key], keys);
      }
    }
    return z.object(newShape).strict() as any;
  }
  if (schema instanceof z.ZodArray) {
    return z.array(deepOmit(schema.element, keys)) as any;
  }
  if (schema instanceof z.ZodTuple) {
    return z.tuple(schema.items.map((item: ZodTypeAny) => deepOmit(item, keys))) as any;
  }
  if (schema instanceof z.ZodRecord) {
    return z.record(deepOmit(schema.valueSchema, keys)) as any;
  }
  if (schema instanceof z.ZodMap) {
    return z.map(schema.keySchema, deepOmit(schema.valueSchema, keys)) as any;
  }
  return schema as any;
}
