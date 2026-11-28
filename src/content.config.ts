import { defineCollection, reference } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { simple } from './data/icons'

const stack = defineCollection({
  loader: file('src/data/stack.yaml'),
  schema: z.object({
    label: z.string(),
    icon: z.enum(Object.keys(simple) as (keyof typeof simple)[]),
  }),
})

const cases = defineCollection({
  loader: file('src/data/cases.yaml'),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      label: z.string(),
      title: z.string(),
      need: z.string(),
      done: z.string(),
      today: z.string(),
      stack: z.array(reference('stack')),
      photo: image(),
      alt: z.string(),
      credit: z.string(),
    }),
})

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    period: z.string(),
    description: z.string(),
    result: z.string(),
    stack: z.array(reference('stack')),
    status: z.string(),
  }),
})

export const collections = { stack, cases, projects }
