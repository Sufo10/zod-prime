import { z } from 'zod';
import { flattenErrors } from '../src/flattenErrors';

describe('flattenErrors', () => {
  it('flattens error paths and messages', () => {
    const schema = z.object({ foo: z.string(), arr: z.array(z.number()) });
    const result = schema.safeParse({ foo: 1, arr: ['a'] });
    if (result.success) throw new Error('Should fail');
    const flat = flattenErrors(result.error);
    expect(flat).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'foo', message: expect.any(String) }),
        expect.objectContaining({ path: 'arr.0', message: expect.any(String) }),
      ])
    );
  });
});
