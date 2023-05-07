import { StatusCodes } from "http-status-codes"
import { HttpError } from "./http-error"

export const getEnv = (envVar: string) => {
  const value = process.env[envVar]

  if (!value) {
    throw new HttpError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error",
      `${envVar} not configured`
    )
  }

  return value
}
