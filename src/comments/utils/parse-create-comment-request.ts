import { StatusCodes } from "http-status-codes"
import {
  CreateCommentRequest,
  isCreateCommentRequest
} from "./create-comment-request"
import { HttpError } from "./http-error"

export const parseCreateCommentRequest = (
  body: string | null
): CreateCommentRequest => {
  const data = JSON.parse(body ?? "")

  if (!isCreateCommentRequest(data)) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      "BadRequest",
      "The request body was invalid"
    )
  }

  return data
}
