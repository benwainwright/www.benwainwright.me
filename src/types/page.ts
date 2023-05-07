export interface Page {
  title: string
  slug: string
  date: Date
  description: string
  published: Date | undefined
  content: string
}

export type SerialisedPage = Page & {
  date: number
  published: number | undefined
}
