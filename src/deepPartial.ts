import { ZodTypeAny, z } from 'zod';

/**
 * Type-level utility: Recursively makes all fields in a type optional.
 */
export type DeepPartial<T> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends Map<infer MK, infer MV>
      ? Map<MK, DeepPartial<MV>>
      : T extends Record<string, any>
        ? { [P in keyof T]?: DeepPartial<T[P]> }
        : T
  : T;

/**
 * Recursively makes all fields in a Zod schema optional.
 *
 * @template T - The Zod schema type.
 * @param schema - The Zod schema to make deeply partial.
 * @returns A new Zod schema with all fields optional, deeply.
 *
 * @example
 * const schema = z.object({ user: z.object({ name: z.string() }) });
 * const partial = deepPartial(schema);
 * // All fields are now optional, deeply
 */
export function deepPartial<T extends ZodTypeAny>(schema: T): z.ZodType<DeepPartial<z.infer<T>>> {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const partialShape: Record<string, ZodTypeAny> = {};
    for (const key in shape) {
      partialShape[key] = deepPartial(shape[key]);
    }
    return z.object(partialShape).partial() as any;
  }
  if (schema instanceof z.ZodArray) {
    return z.array(deepPartial(schema.element)) as any;
  }
  if (schema instanceof z.ZodTuple) {
    return z.tuple(schema.items.map(deepPartial)) as any;
  }
  if (schema instanceof z.ZodRecord) {
    return z.record(deepPartial(schema.valueSchema)) as any;
  }
  if (schema instanceof z.ZodMap) {
    return z.map(schema.keySchema, deepPartial(schema.valueSchema)) as any;
  }
  return schema.optional() as any;
}
