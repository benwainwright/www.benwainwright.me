import AWS from "aws-sdk"
import { APIGatewayProxyHandler } from "aws-lambda"

import { httpResponse } from "../utils/http-response"
import { getEnv } from "../utils/get-env"
import { parseCommentsPath } from "./utils/parse-comments-path"
import { handleLambdaError } from "../utils/handle-lambda-error"
import { COMMENTS_BUCKET } from "../../constants"

export const getComments: APIGatewayProxyHandler = async event => {
  try {
    const bucket = getEnv(COMMENTS_BUCKET)
    const post = parseCommentsPath(event.path)
    const s3 = new AWS.S3()

    /* eslint-disable @typescript-eslint/naming-convention */
    const params = {
      Prefix: post,
      Bucket: bucket,
    }

    const { Contents } = await s3.listObjects(params).promise()
    /* eslint-enable @typescript-eslint/naming-convention */

    const keys = Contents?.map(object => object.Key)

    const responses = await Promise.all(
      keys?.map(async key => {
        if (!key) {
          return
        }

        /* eslint-disable @typescript-eslint/naming-convention */
        const getParams = {
          Key: key,
          Bucket: bucket,
        }
        /* eslint-enable @typescript-eslint/naming-convention */
        return await s3.getObject(getParams).promise()
      }) ?? []
    )

    const isDefined = (thing: string | undefined): thing is string =>
      Boolean(thing)

    const comments = responses
      .map(response => response?.Body?.toString("utf-8"))
      // eslint-disable-next-line unicorn/no-array-callback-reference
      .filter(isDefined)
      .map(response => JSON.parse(response))

    return httpResponse({
      status: "Success",
      message: "foo",
      body: comments,
    })
  } catch (error) {
    return handleLambdaError(error)
  }
}
