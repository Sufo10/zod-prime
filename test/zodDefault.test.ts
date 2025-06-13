import { z } from 'zod';
import { zodDefault } from '../src/zodDefault';

describe('zodDefault', () => {
  it('sets a default value for a schema', () => {
    const schema = zodDefault(z.string(), 'hello');
    expect(schema.parse(undefined)).toBe('hello');
    expect(schema.parse('world')).toBe('world');
  });
});
