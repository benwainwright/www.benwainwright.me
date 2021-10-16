import { APIGatewayProxyHandler } from "aws-lambda"
import { HttpError } from "./http-error"
import { StatusCodes } from "http-status-codes"
import { httpResponse } from "./http-response"
import AWS from "aws-sdk"
import { getBucket } from "./get-bucket"

export const getComments: APIGatewayProxyHandler = async event => {
  try {
    const Bucket = getBucket()
    const parts = event.path?.split("/")

    const post = parts?.[parts.length - 1]

    if (!post) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        "Invalid Request",
        "The path must include the post name"
      )
    }
    const params = {
      Prefix: post,
      Bucket
    }

    const s3 = new AWS.S3()

    const { Contents } = await s3.listObjects(params).promise()

    console.log(Contents)

    const keys = Contents?.map(object => object.Key)

    console.log(keys)

    const objects = await Promise.all(
      keys?.map(async Key => {
        if (!Key) {
          return
        }
        const params = {
          Key,
          Bucket
        }
        return await s3.getObject(params).promise()
      }) ?? []
    )

    console.log(objects)

    const comments = objects.map(object =>
      typeof object?.Body === "string" ? JSON.parse(object.Body) : object?.Body
    )

    console.log(comments)

    return httpResponse({
      status: "Success",
      message: "foo",
      body: comments
    })
  } catch (error) {
    console.log(error)

    const status =
      error instanceof HttpError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR

    const statusMessage =
      error instanceof HttpError ? error.statusMessage : "Error"

    return httpResponse({
      statusCode: status,
      status: statusMessage,
      message: error.message
    })
  }
}
