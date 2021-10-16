export interface CommentRequest {
  author: string
  timestamp: number
  message: string
}

export const isCommentRequest = (thing: unknown): thing is CommentRequest => {
  const rawThing = thing as CommentRequest

  return (
    typeof rawThing.author === "string" &&
    typeof rawThing.timestamp === "number" &&
    typeof rawThing.message === "string"
  )
}
