import { z, ZodTypeAny } from 'zod';

/**
 * Type-level utility: Recursively makes all fields in a type required.
 */
export type DeepRequired<T> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepRequired<U>>
    : T extends Map<infer MK, infer MV>
      ? Map<MK, DeepRequired<MV>>
      : T extends Record<string, any>
        ? { [P in keyof T]-?: DeepRequired<T[P]> }
        : T
  : T;

/**
 * Recursively makes all fields in a Zod schema required.
 *
 * @template T - The Zod schema type.
 * @param schema - The Zod schema to make deeply required.
 * @returns A new Zod schema with all fields required, deeply.
 *
 * @example
 * const schema = z.object({ user: z.object({ name: z.string().optional() }) });
 * const required = deepRequired(schema);
 * // All fields are now required, deeply
 */
export function deepRequired<T extends ZodTypeAny>(schema: T): z.ZodType<DeepRequired<z.infer<T>>> {
  // Unwrap optionals and nullables recursively
  if (
    schema._def?.typeName === z.ZodFirstPartyTypeKind.ZodOptional ||
    schema._def?.typeName === z.ZodFirstPartyTypeKind.ZodNullable
  ) {
    return deepRequired(schema._def.innerType) as any;
  }
  if (schema instanceof z.ZodObject) {
    // Remove partial by reconstructing the object
    const shape = schema.shape;
    const requiredShape: Record<string, ZodTypeAny> = {};
    for (const key in shape) {
      requiredShape[key] = deepRequired(shape[key]);
    }
    return z.object(requiredShape) as any;
  }
  if (schema instanceof z.ZodArray) {
    return z.array(deepRequired(schema.element)) as any;
  }
  if (schema instanceof z.ZodTuple) {
    return z.tuple(schema.items.map(deepRequired)) as any;
  }
  if (schema instanceof z.ZodRecord) {
    return z.record(deepRequired(schema.valueSchema)) as any;
  }
  if (schema instanceof z.ZodMap) {
    return z.map(schema.keySchema, deepRequired(schema.valueSchema)) as any;
  }
  return schema as any;
}
