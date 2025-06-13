import { z } from 'zod';

export type zodInferType<T extends z.ZodTypeAny> = z.infer<T>;
