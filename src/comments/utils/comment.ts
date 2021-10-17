export interface Comment {
  author: string
  email: string
  timestamp: number
  message: string
}

export const isComment = (thing: unknown): thing is Comment => {
  const rawThing = thing as Comment

  return (
    typeof rawThing.author === "string" &&
    typeof rawThing.timestamp === "number" &&
    typeof rawThing.message === "string"
    typeof rawThing.email === "string"
  )
}
