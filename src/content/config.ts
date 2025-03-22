import { defineCollection, z } from 'astro:content';

const initiatives = defineCollection({
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
      description: z.string().optional(),
    })).optional(),
    pullRequests: z.array(z.object({
      number: z.number(),
      title: z.string(),
      url: z.string().url(),
      author: z.string(),
      mergedAt: z.string(),
      description: z.string().optional(),
    })).optional(),
    // New fields
    agency: z.string().optional(),
    impactAreas: z.array(z.string()).optional(),
    progressPercentage: z.number().min(0).max(100).optional(),
    tags: z.array(z.string()).optional(),
    priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    leadSponsors: z.array(z.string()).optional(),
    timeline: z.array(z.object({
      date: z.date(),
      title: z.string(),
      description: z.string().optional(),
      url: z.string().url().optional(),
    })).optional(),
  }),
});

export const collections = { initiatives };