import { z } from 'zod';

/**
 * Converts a Zod schema to a minimal JSON Schema representation.
 *
 * @param schema - The Zod schema to convert.
 * @returns A JSON Schema object.
 *
 * @remarks
 * Only handles ZodObject, ZodString, ZodNumber, ZodBoolean, ZodArray, ZodOptional, ZodNullable.
 * For production, use the `zod-to-json-schema` package for full support.
 *
 * @example
 * const schema = z.object({ foo: z.string() });
 * const jsonSchema = zodToJsonSchema(schema);
 * // { type: 'object', properties: { foo: { type: 'string' } } }
 */
export function zodToJsonSchema(schema: z.ZodTypeAny): object {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const properties: Record<string, any> = {};
    for (const key in shape) {
      properties[key] = zodToJsonSchema(shape[key]);
    }
    return { type: 'object', properties };
  }
  if (schema instanceof z.ZodString) return { type: 'string' };
  if (schema instanceof z.ZodNumber) return { type: 'number' };
  if (schema instanceof z.ZodBoolean) return { type: 'boolean' };
  if (schema instanceof z.ZodArray) return { type: 'array', items: zodToJsonSchema(schema.element) };
  if (
    schema._def?.typeName === z.ZodFirstPartyTypeKind.ZodOptional ||
    schema._def?.typeName === z.ZodFirstPartyTypeKind.ZodNullable
  ) {
    return zodToJsonSchema(schema._def.innerType);
  }
  return {};
}
