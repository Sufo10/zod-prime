import { z } from 'zod';
import type { zodInferType } from '../src/zodInferType';

describe('zodInferType', () => {
  it('infers the correct TypeScript type from a Zod schema', () => {
    const schema = z.object({ foo: z.string(), bar: z.number() });
    type T = zodInferType<typeof schema>;
    const value: T = { foo: 'x', bar: 1 };
    expect(value.foo).toBe('x');
    expect(value.bar).toBe(1);
  });
});
