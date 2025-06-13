import { z } from 'zod';
import { deepRequired } from '../src/deepRequired';

describe('deepRequired', () => {
  it('makes all fields required, deeply', () => {
    const schema = z
      .object({
        foo: z.object({ bar: z.string().optional() }).optional(),
        arr: z.array(z.object({ baz: z.number().optional() })).optional(),
        tuple: z.tuple([z.string().optional(), z.object({ deep: z.number().optional() })]),
        rec: z.record(z.object({ val: z.boolean().optional() })).optional(),
        map: z.map(z.string(), z.object({ m: z.number().optional() })),
      })
      .partial();
    const required = deepRequired(schema);
    expect(() =>
      required.parse({
        foo: { bar: 'x' },
        arr: [{ baz: 1 }],
        tuple: ['a', { deep: 2 }],
        rec: { k: { val: true } },
        map: new Map([['a', { m: 1 }]]),
      })
    ).not.toThrow();
    expect(() => required.parse({})).toThrow();
  });
});
