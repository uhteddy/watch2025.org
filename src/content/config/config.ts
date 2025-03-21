import { defineCollection, z } from 'astro:content';

export const collections = {
  initiatives: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      status: z.enum(['proposed', 'in-progress', 'passed', 'blocked']),
      category: z.string(),
      dateProposed: z.date(),
      datePassed: z.date().optional(),
      sources: z.array(z.object({
        title: z.string(),
        url: z.string().url(),
      })).optional(),
      pullRequests: z.array(z.object({
        number: z.number(),
        title: z.string(),
        url: z.string().url(),
        author: z.string(),
        mergedAt: z.string(),
        description: z.string().optional(),
      })).optional(),
    }),
  }),
};