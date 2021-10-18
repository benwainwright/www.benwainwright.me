import { StatusCodes } from "http-status-codes"

export class HttpError extends Error {
  public constructor(
    public readonly statusCode: StatusCodes,
    public readonly statusMessage: string,
    message: string
  ) {
    super(message)
  }
}
