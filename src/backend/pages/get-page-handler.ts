import { APIGatewayProxyHandler } from "aws-lambda"
import { httpResponse } from "../utils/http-response"
import { PAGES_TABLE, SLUG } from "../../constants"
import { getEnv } from "../utils/get-env"
import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument, QueryCommand } from "@aws-sdk/lib-dynamodb"
import { getSlug } from "./get-slug"

export const getPage: APIGatewayProxyHandler = async event => {
  const table = getEnv(PAGES_TABLE)

  const client = new DynamoDB({})
  const docClient = DynamoDBDocument.from(client)

  const slug = getSlug(event)

  const command = new QueryCommand({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TableName: table,

    // eslint-disable-next-line @typescript-eslint/naming-convention
    KeyConditionExpression: `slug = :slug`,

    // eslint-disable-next-line @typescript-eslint/naming-convention
    ExpressionAttributeValues: {
      ":slug": slug,
    },
  })

  const response = await docClient.send(command)

  return httpResponse({
    body: response.Items?.[0],
  })
}
