import { StatusCodes } from "http-status-codes"
import { CommentRequest, isCommentRequest } from "./comment-request"
import { HttpError } from "./http-error"

export const parseCommentRequest = (body: string | null): CommentRequest => {
  const data = JSON.parse(body ?? "")

  if (!isCommentRequest(data)) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      "BadRequest",
      "The request body was invalid"
    )
  }

  return data
}
