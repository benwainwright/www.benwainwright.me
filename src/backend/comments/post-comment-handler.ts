import { APIGatewayProxyHandler } from "aws-lambda"
import { parseCreateCommentRequest } from "./utils/parse-create-comment-request"
import AWS from "aws-sdk"
// eslint-disable-next-line unicorn/prefer-node-protocol
import * as crypto from "crypto"
import { getEnv } from "../utils/get-env"
import { httpResponse } from "../utils/http-response"
import { parseCommentsPath } from "./utils/parse-comments-path"
import { handleLambdaError } from "../utils/handle-lambda-error"
import { COMMENTS_BUCKET } from "../../constants"

export const postComment: APIGatewayProxyHandler = async event => {
  try {
    const bucket = getEnv(COMMENTS_BUCKET)
    const comment = parseCreateCommentRequest(event.body)
    const post = parseCommentsPath(event.path)

    const s3 = new AWS.S3()

    // eslint-disable-next-line unicorn/no-null
    const body = JSON.stringify(comment, null, 2)
    const hash = crypto.createHash("md5").update(body).digest("hex")
    const key = `${post}/${hash}.json`

    /* eslint-disable @typescript-eslint/naming-convention */
    const params = {
      Key: key,
      Body: body,
      Bucket: bucket,
    }
    /* eslint-enable @typescript-eslint/naming-convention */

    await s3.putObject(params).promise()

    return httpResponse({
      status: "Success",
      message: `Successfully created ${key}`,
    })
  } catch (error) {
    return handleLambdaError(error)
  }
}
