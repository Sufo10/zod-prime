import { deepPartial, deepRequired, emailPasswordSchema, flattenErrors, refineObject, smartEnum } from '../src';

describe('zod-prime index exports', () => {
  it('exports all utilities', () => {
    expect(typeof deepPartial).toBe('function');
    expect(typeof deepRequired).toBe('function');
    expect(typeof emailPasswordSchema).toBe('function');
    expect(typeof flattenErrors).toBe('function');
    expect(typeof refineObject).toBe('function');
    expect(typeof smartEnum).toBe('function');
  });
});
