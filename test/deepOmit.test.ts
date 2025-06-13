import { z } from 'zod';
import { deepOmit } from '../src/deepOmit';

describe('deepOmit', () => {
  it('removes keys deeply', () => {
    const schema = z.object({
      a: z.string(),
      b: z.object({ c: z.number(), d: z.string() }),
      arr: z.array(z.object({ e: z.boolean(), f: z.string() })),
    });
    const omitted = deepOmit(schema, ['b', 'e']);
    expect(omitted.safeParse({ a: 'x', arr: [{ f: 'y' }] }).success).toBe(true);
    expect(
      omitted.safeParse({ a: 'x', b: { c: 1, d: 'z' }, arr: [{ e: true, f: 'y' }] }).success
    ).toBe(false);
  });
});
