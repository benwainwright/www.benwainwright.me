import { StatusCodes } from "http-status-codes"
export const httpResponse = ({
  statusCode = StatusCodes.OK,
  status,
  message,
  headers,
  body = { status: status ?? "", message: message ?? "" }
}: {
  statusCode?: StatusCodes
  status?: string
  message?: string
  headers?: Record<string, string>
  body?: Record<string, string> | Record<string, string>[]
}) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body, null, 2),
    headers: { "access-control-allow-origin": "*", ...(headers ?? {}) }
  }
}
