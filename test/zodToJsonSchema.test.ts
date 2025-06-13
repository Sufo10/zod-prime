import { z } from 'zod';
import { zodToJsonSchema } from '../src/zodToJsonSchema';

describe('zodToJsonSchema', () => {
  it('converts a Zod schema to JSON Schema', () => {
    const schema = z.object({
      foo: z.string(),
      bar: z.number(),
      baz: z.array(z.boolean()),
    });
    const jsonSchema = zodToJsonSchema(schema);
    expect(jsonSchema).toEqual({
      type: 'object',
      properties: {
        foo: { type: 'string' },
        bar: { type: 'number' },
        baz: { type: 'array', items: { type: 'boolean' } },
      },
    });
  });
});
