import { z } from 'zod';

export const newPageSchema = z.object({
  title: z.string()
    .min(1, { message: 'is required' })
    .max(80, { message: 'must be less than 80 characters' }),
  description: z.string()
    .min(10, { message: 'must be at least 10 characters' })
    .max(80, { message: 'must be less than 80 characters' })
    .optional()
    .or(z.literal('')),
});