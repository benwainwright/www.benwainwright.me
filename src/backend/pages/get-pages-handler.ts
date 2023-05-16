import { APIGatewayProxyHandler } from "aws-lambda"
import { httpResponse } from "../utils/http-response"
import { PAGES_TABLE } from "../../constants"
import { getEnv } from "../utils/get-env"
import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument, ScanCommand } from "@aws-sdk/lib-dynamodb"

export const getPages: APIGatewayProxyHandler = async () => {
  const table = getEnv(PAGES_TABLE)

  const client = new DynamoDB({})
  const docClient = DynamoDBDocument.from(client)

  const command = new ScanCommand({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TableName: table,
  })

  const response = await docClient.send(command)

  return httpResponse({
    body: response.Items,
  })
}
