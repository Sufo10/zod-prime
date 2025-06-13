import { z, ZodTypeAny } from 'zod';

/**
 * Type-level utility: Recursively picks only specified keys from a type.
 */
export type DeepPick<T, K extends string> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepPick<U, K>>
    : T extends Map<infer MK, infer MV>
    ? Map<MK, DeepPick<MV, K>>
    : T extends Record<string, any>
    ? { [P in Extract<keyof T, K>]: DeepPick<T[P], K> }
    : T
  : T;

/**
 * Recursively picks only specified keys from a Zod schema, deeply.
 *
 * @template T - The Zod schema type.
 * @template K - The keys to pick (string union).
 * @param schema - The Zod schema to pick keys from.
 * @param keys - The keys to pick (as a string array).
 * @returns A new Zod schema with only the specified keys, deeply.
 *
 * @example
 * const schema = z.object({ a: z.string(), b: z.object({ c: z.number() }) });
 * const picked = deepPick(schema, ['a', 'c']);
 */
export function deepPick<T extends ZodTypeAny, K extends string>(
  schema: T,
  keys: readonly K[]
): z.ZodType<DeepPick<z.infer<T>, K>> {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const newShape: Record<string, ZodTypeAny> = {};
    for (const key in shape) {
      if (keys.includes(key as K)) {
        newShape[key] = deepPick(shape[key], keys);
      } else if (shape[key] instanceof z.ZodObject || shape[key] instanceof z.ZodArray) {
        // Recursively pick in nested objects/arrays
        const nested = deepPick(shape[key], keys);
        // Only add if nested object/array has keys
        if (
          (nested instanceof z.ZodObject && Object.keys((nested as any).shape ?? {}).length > 0) ||
          (nested instanceof z.ZodArray &&
            ((nested.element instanceof z.ZodObject && Object.keys((nested.element as any).shape ?? {}).length > 0) ||
              !(nested.element instanceof z.ZodObject)))
        ) {
          newShape[key] = nested;
        }
      }
    }
    return z.object(newShape).strict() as any;
  }
  if (schema instanceof z.ZodArray) {
    const pickedElement = deepPick(schema.element, keys);
    // Only keep array if the element is not an empty object
    if (pickedElement instanceof z.ZodObject && Object.keys((pickedElement as any).shape ?? {}).length === 0) {
      // If the picked element is an empty object, return an array of never
      return z.array(z.never()) as any;
    }
    return z.array(pickedElement) as any;
  }
  if (schema instanceof z.ZodTuple) {
    return z.tuple(schema.items.map((item: ZodTypeAny) => deepPick(item, keys))) as any;
  }
  if (schema instanceof z.ZodRecord) {
    return z.record(deepPick(schema.valueSchema, keys)) as any;
  }
  if (schema instanceof z.ZodMap) {
    return z.map(schema.keySchema, deepPick(schema.valueSchema, keys)) as any;
  }
  return schema as any;
}
