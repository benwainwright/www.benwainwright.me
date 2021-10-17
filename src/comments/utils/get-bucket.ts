import { StatusCodes } from "http-status-codes"
import { HttpError } from "./http-error"

export const getBucket = () => {
  const bucket = process.env.COMMENTS_BUCKET

  if (!bucket) {
    throw new HttpError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error",
      "Bucket not configured"
    )
  }

  return bucket
}
