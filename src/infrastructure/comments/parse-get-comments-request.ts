import { StatusCodes } from "http-status-codes"
import {
  GetCommentsRequest,
  isGetCommentsRequest
} from "./get-comments-request"
import { HttpError } from "./http-error"

export const parseGetCommentsRequest = (
  body: string | null
): GetCommentsRequest => {
  const data = JSON.parse(body ?? "")

  if (!isGetCommentsRequest(data)) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      "BadRequest",
      "The request body was invalid"
    )
  }

  return data
}
