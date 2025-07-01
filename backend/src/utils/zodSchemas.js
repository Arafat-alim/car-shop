import { z } from 'zod';

const carSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().int().min(1900).max(2026, 'Invalid Year'),
  price: z.number().min(0, 'Invalid price'),
  image: z.string().url('Invalid image url'),
  description: z.string().optional(),
});

const updateCarSchema = z.object({
  make: z.string().min(1, 'Make is required').optional(),
  model: z.string().min(1, 'Model is required').optional(),
  year: z.number().int().min(1900).max(2026, 'Invalid Year').optional(),
  price: z.number().min(0, 'Invalid price').optional(),
  image: z.string().url('Invalid image url').optional(),
  description: z.string().optional().optional(),
});

export { carSchema, updateCarSchema };
