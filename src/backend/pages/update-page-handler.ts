import { PAGES_TABLE } from "../../constants"
import { getEnv } from "../utils/get-env"
import { httpResponse } from "../utils/http-response"
import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument, PutCommand } from "@aws-sdk/lib-dynamodb"
import { SerialisedPage, serialisedPageSchema } from "../../types/page"
import { APIGatewayProxyHandler } from "aws-lambda"
import { getSlug } from "./get-slug"

export const updatePage: APIGatewayProxyHandler = async event => {
  const table = getEnv(PAGES_TABLE)

  const body = JSON.parse(event.body ?? "") as unknown

  serialisedPageSchema.parse(body)

  const isPut = event.httpMethod.toLocaleLowerCase() === "put"

  const page = body as SerialisedPage

  const slug = isPut ? getSlug(event) : page.slug

  const conditionExpression = isPut
    ? "attribute_exists(slug)"
    : "attribute_not_exists(slug)"

  const client = new DynamoDB({})
  const docClient = DynamoDBDocument.from(client)

  const command = new PutCommand({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TableName: table,

    // eslint-disable-next-line @typescript-eslint/naming-convention
    Item: { ...page, slug },

    // eslint-disable-next-line @typescript-eslint/naming-convention
    ConditionExpression: conditionExpression,
  })

  await docClient.send(command)

  return httpResponse({
    body: {},
  })
}
