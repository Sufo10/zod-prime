import { z } from 'zod';
import { refineObject } from '../src/refineObject';

describe('refineObject', () => {
  it('adds cross-field validation', () => {
    const schema = refineObject(
      z.object({ password: z.string(), confirm: z.string() }),
      (data) => data.password === data.confirm,
      'Passwords must match'
    );
    expect(() => schema.parse({ password: 'a', confirm: 'a' })).not.toThrow();
    expect(() => schema.parse({ password: 'a', confirm: 'b' })).toThrow(/Passwords must match/);
  });
});
