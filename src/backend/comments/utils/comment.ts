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
    typeof rawThing.message === "string" &&
    typeof rawThing.email === "string"
  )
}

export const assertComment: (
  thing: unknown
) => asserts thing is Comment = thing => {
  if (!isComment(thing)) {
    throw new Error(`'${thing}' should be a valid comment`)
  }
}
