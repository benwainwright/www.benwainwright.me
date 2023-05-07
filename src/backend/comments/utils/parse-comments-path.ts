import { StatusCodes } from "http-status-codes"
import { HttpError } from "../../utils/http-error"

export const parseCommentsPath = (path: string | null): string => {
  const parts = path?.split("/")

  const post = parts?.[parts.length - 1]

  if (!post) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      "Invalid Request",
      "The path must include the post name"
    )
  }

  return post
}
