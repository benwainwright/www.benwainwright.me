import { StatusCodes } from "http-status-codes"
import { Comment, isComment } from "./comment"
import { HttpError } from "./http-error"

export const parseCreateCommentRequest = (body: string | null): Comment => {
  const data = JSON.parse(body ?? "")

  if (!isComment(data)) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      "BadRequest",
      "The request body was invalid"
    )
  }

  return data
}
