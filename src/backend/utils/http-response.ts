import { StatusCodes } from "http-status-codes"
export const httpResponse = <T>({
  statusCode = StatusCodes.OK,
  headers,
  body,
}: {
  statusCode?: StatusCodes
  status?: string
  message?: string
  headers?: Record<string, string>
  body?: T
}) => {
  const finalBody = body ? body : { status, statusCode }
  return {
    statusCode,
    // eslint-disable-next-line unicorn/no-null
    body: JSON.stringify(finalBody, null, 2),
    headers: { "access-control-allow-origin": "*", ...headers },
  }
}
