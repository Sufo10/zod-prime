import { z } from 'zod';
import { deepPick } from '../src/deepPick';

describe('deepPick', () => {
  it('keeps only picked keys deeply', () => {
    const schema = z.object({
      a: z.string(),
      b: z.object({ c: z.number(), d: z.string() }),
      arr: z.array(z.object({ e: z.boolean(), f: z.string() })),
    });
    const picked = deepPick(schema, ['a', 'c', 'f']);
    expect(picked.safeParse({ a: 'x', b: { c: 1 }, arr: [{ f: 'y' }] }).success).toBe(true);
    expect(picked.safeParse({ a: 'x', b: { d: 'z' }, arr: [{ e: true }] }).success).toBe(false);
  });
});
