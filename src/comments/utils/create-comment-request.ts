export interface CreateCommentRequest {
  author: string
  timestamp: number
  message: string
}

export const isCreateCommentRequest = (
  thing: unknown
): thing is CreateCommentRequest => {
  const rawThing = thing as CreateCommentRequest

  return (
    typeof rawThing.author === "string" &&
    typeof rawThing.timestamp === "number" &&
    typeof rawThing.message === "string"
  )
}
