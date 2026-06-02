import { z } from 'zod';

export const CheckoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Email must be valid'),
  address: z.string().min(1, 'Address is required'),
});

export type CheckoutFormData = z.infer<typeof CheckoutSchema>;