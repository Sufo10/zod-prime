import { z } from 'zod';
import { mergeSchemas } from '../src/mergeSchemas';

describe('mergeSchemas', () => {
  it('merges two object schemas', () => {
    const a = z.object({ foo: z.string() });
    const b = z.object({ bar: z.number() });
    const merged = mergeSchemas(a, b);
    expect(merged.safeParse({ foo: 'x', bar: 1 }).success).toBe(true);
    expect(merged.safeParse({ foo: 'x' }).success).toBe(false);
    expect(merged.safeParse({ bar: 1 }).success).toBe(false);
  });
});
