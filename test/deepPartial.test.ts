import { z } from 'zod';
import { deepPartial } from '../src/deepPartial';

describe('deepPartial', () => {
  it('makes nested fields optional', () => {
    const schema = z.object({
      foo: z.object({ bar: z.string() }),
      arr: z.array(z.object({ baz: z.number() })),
      tuple: z.tuple([z.string(), z.object({ deep: z.number() })]),
      rec: z.record(z.object({ val: z.boolean() })),
      map: z.map(z.string(), z.object({ m: z.number() })),
    });
    const partial = deepPartial(schema);
    expect(() => partial.parse({})).not.toThrow();
    expect(() =>
      partial.parse({ foo: {}, arr: [{}], tuple: [undefined, {}], rec: {}, map: new Map() })
    ).not.toThrow();
  });
});
