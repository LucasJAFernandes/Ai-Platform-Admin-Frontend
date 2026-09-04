import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'User is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;
