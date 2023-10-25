import { z } from 'zod';

export const contentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  bandName: z
    .string()
    .min(3, 'Band name must be at least 3 characters long.')
    .max(50, 'Band name must be at most 50 characters long.'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long.')
    .max(500, 'Description must be at most 500 characters long.'),
  image: z.any()
});

export type ContentSchema = typeof contentSchema;

export const detailsSchema = z.object({
  date: z.date().min(new Date(), { message: 'Date must be today or in the future' }),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string()
});

export type DetailsSchema = typeof detailsSchema;

export const fullJamSchema = z.object({
  ...contentSchema.shape,
  ...detailsSchema.shape
});

export type FullJamSchema = typeof fullJamSchema;