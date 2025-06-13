import { z, ZodObject, ZodRawShape } from 'zod';

/**
 * Adds cross-field validation to a Zod object schema.
 *
 * @template T - The Zod object shape.
 * @param schema - The Zod object schema to refine.
 * @param refineFn - A function that receives the parsed object and returns true if valid.
 * @param message - The error message to show if validation fails.
 * @returns The refined Zod object schema.
 *
 * @example
 * const schema = refineObject(
 *   z.object({ password: z.string(), confirm: z.string() }),
 *   data => data.password === data.confirm,
 *   'Passwords must match'
 * );
 */
export function refineObject<T extends ZodRawShape>(
  schema: ZodObject<T>,
  refineFn: (data: z.infer<typeof schema>) => boolean,
  message: string
) {
  return schema.superRefine((data, ctx) => {
    if (!refineFn(data)) {
      ctx.addIssue({ code: 'custom', message });
    }
  });
}
