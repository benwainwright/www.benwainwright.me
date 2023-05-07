export interface GetCommentsRequest {
  post: string
}

export const isGetCommentsRequest = (
  thing: unknown
): thing is GetCommentsRequest => {
  const rawThing = thing as GetCommentsRequest

  return typeof rawThing.post === "string"
}
