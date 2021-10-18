import { StatusCodes } from "http-status-codes"
import { HttpError } from "./http-error"
import { httpResponse } from "./http-response"

export const handleLambdaError = (error: unknown) => {
  // eslint-disable-next-line no-console
  console.log(error)

  const status =
    error instanceof HttpError
      ? error.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR

  const statusMessage =
    error instanceof HttpError ? error.statusMessage : "Error"

  const message =
    error instanceof Error ? error.message : "Something went wrong!"

  return httpResponse({
    statusCode: status,
    status: statusMessage,
    message
  })
}
