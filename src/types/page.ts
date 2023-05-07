import { z } from "zod"

export const pageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.date(),
  description: z.string(),
  content: z.string(),
})

export const serialisedPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.number(),
  description: z.string(),
  content: z.string(),
})

export type Page = z.infer<typeof pageSchema>

export type SerialisedPage = z.infer<typeof serialisedPageSchema>
