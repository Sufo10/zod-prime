import { emailPasswordSchema } from '../src/emailPasswordSchema';

describe('emailPasswordSchema', () => {
  it('validates email and password with defaults', () => {
    const schema = emailPasswordSchema();
    expect(() => schema.parse({ email: 'a@b.com', password: '12345678' })).not.toThrow();
    expect(() => schema.parse({ email: 'bad', password: '12345678' })).toThrow();
    expect(() => schema.parse({ email: 'a@b.com', password: 'short' })).toThrow();
  });
  it('enforces minPasswordLength and special char', () => {
    const schema = emailPasswordSchema({ minPasswordLength: 10, requireSpecialChar: true });
    expect(() => schema.parse({ email: 'a@b.com', password: '123456789!' })).not.toThrow();
    expect(() => schema.parse({ email: 'a@b.com', password: '1234567890' })).toThrow();
  });
});
