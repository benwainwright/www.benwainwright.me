import { APIGatewayProxyHandler } from "aws-lambda"
import { HttpError } from "./http-error"
import { parseCommentRequest } from "./parse-comment-request"
import { StatusCodes } from "http-status-codes"
import { httpResponse } from "./http-response"
import AWS from "aws-sdk"
import * as crypto from "crypto"
import { getBucket } from "./get-bucket"

export const postComment: APIGatewayProxyHandler = async event => {
  try {
    const Bucket = getBucket()
    const comment = parseCommentRequest(event.body)

    const parts = event.path?.split("/")

    const post = parts?.[parts.length - 1]

    if (!post) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        "Invalid Request",
        "The path must include the post name"
      )
    }
    const s3 = new AWS.S3()
    const Body = JSON.stringify(comment, null, 2)
    const hash = crypto.createHash("md5").update(Body).digest("hex")
    const Key = `${post}/${hash}.json`

    const params = {
      Key,
      Body,
      Bucket
    }

    await s3.putObject(params).promise()

    return httpResponse({
      status: "Success",
      message: `Successfully created ${Key}`
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
