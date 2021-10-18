import AWS from "aws-sdk"
import { APIGatewayProxyHandler } from "aws-lambda"

import { HttpError } from "./utils/http-error"
import { StatusCodes } from "http-status-codes"
import { httpResponse } from "./utils/http-response"
import { getBucket } from "./utils/get-bucket"
import { parseCommentsPath } from "./utils/parse-comments-path"

export const getComments: APIGatewayProxyHandler = async event => {
  try {
    const Bucket = getBucket()
    const post = parseCommentsPath(event.path)

    const params = {
      Prefix: post,
      Bucket,
    }

    const s3 = new AWS.S3()

    const { Contents } = await s3.listObjects(params).promise()

    const keys = Contents?.map(object => object.Key)

    const responses = await Promise.all(
      keys?.map(async Key => {
        if (!Key) {
          return
        }
        const params = {
          Key,
          Bucket,
        }
        return await s3.getObject(params).promise()
      }) ?? []
    )

    const isDefined = (thing: string | undefined): thing is string =>
      Boolean(thing)

    const comments = responses
      .map(response => response?.Body?.toString("utf-8"))
      .filter(isDefined)
      .map(response => JSON.parse(response))

    return httpResponse({
      status: "Success",
      message: "foo",
      body: comments,
    })
  } catch (error) {
    const status =
      error instanceof HttpError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR

    const statusMessage =
      error instanceof HttpError ? error.statusMessage : "Error"

    return httpResponse({
      statusCode: status,
      status: statusMessage,
      message: error.message,
    })
  }
}
