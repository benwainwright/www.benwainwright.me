import { APIGatewayProxyHandler } from "aws-lambda"
import { parseCreateCommentRequest } from "./utils/parse-create-comment-request"
import AWS from "aws-sdk"
import * as crypto from "crypto"
import { getBucket } from "./utils/get-bucket"
import { httpResponse } from "./utils/http-response"
import { parseCommentsPath } from "./utils/parse-comments-path"
import { handleLambdaError } from "./utils/handle-lambda-error"

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
      Bucket
    }

    await s3.putObject(params).promise()

    return httpResponse({
      status: "Success",
      message: `Successfully created ${Key}`
    })
  } catch (error) {
    return handleLambdaError(error)
  }
}
