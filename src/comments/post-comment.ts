import { APIGatewayProxyHandler } from "aws-lambda"
import { StatusCodes } from "http-status-codes"
import { parseCreateCommentRequest } from "./utils/parse-create-comment-request"
import AWS from "aws-sdk"
import * as crypto from "crypto"
import { getBucket } from "./utils/get-bucket"
import { HttpError } from "./utils/http-error"
import { httpResponse } from "./utils/http-response"
import { parseCommentsPath } from "./utils/parse-comments-path"

export const postComment: APIGatewayProxyHandler = async event => {
  try {
    const Bucket = getBucket()
    const comment = parseCreateCommentRequest(event.body)
    const post = parseCommentsPath(event.path)

    const s3 = new AWS.S3()
    const Body = JSON.stringify(comment, null, 2)
    const hash = crypto.createHash("md5").update(Body).digest("hex")
    const Key = `${post}/${hash}.json`

    const params = {
      Key,
      Body,
      Bucket,
    }

    await s3.putObject(params).promise()

    return httpResponse({
      status: "Success",
      message: `Successfully created ${Key}`,
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
      message: error.message,
    })
  }
}
