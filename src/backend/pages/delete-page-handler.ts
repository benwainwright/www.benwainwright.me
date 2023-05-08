import { APIGatewayProxyHandler } from "aws-lambda"
import { httpResponse } from "../utils/http-response"
import { PAGES_TABLE } from "../../constants"
import { getEnv } from "../utils/get-env"
import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DeleteCommand, DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { getSlug } from "./get-slug"

export const deletePage: APIGatewayProxyHandler = async event => {
  const table = getEnv(PAGES_TABLE)

  const client = new DynamoDB({})
  const docClient = DynamoDBDocument.from(client)

  const slug = getSlug(event)

  const command = new DeleteCommand({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TableName: table,

    // eslint-disable-next-line @typescript-eslint/naming-convention
    Key: { slug },
  })

  await docClient.send(command)

  return httpResponse({ body: {} })
}
