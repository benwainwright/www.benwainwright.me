import { APIGatewayProxyEvent } from "aws-lambda"
import { SLUG } from "../../constants"

export const getSlug = (event: APIGatewayProxyEvent) => {
  if (event.pathParameters) {
    return event.pathParameters[SLUG]
  }

  throw new Error("Slug not found")
}
