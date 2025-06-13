import { smartEnum } from '../src/smartEnum';
import { z } from 'zod';

describe('smartEnum', () => {
  it('creates a zod enum from a string array', () => {
    const Color = smartEnum(['red', 'green', 'blue'] as const);
    expect(Color.safeParse('red').success).toBe(true);
    expect(Color.safeParse('yellow').success).toBe(false);
    // Type inference
    type ColorType = z.infer<typeof Color>;
    const color: ColorType = 'green';
    expect(color).toBe('green');
  });
});
