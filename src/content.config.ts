import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title:    z.string(),
    summary:  z.string(),
    date:     z.coerce.date(),
    tags:     z.array(z.string()).default([]),
    stack:    z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft:    z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
