import { BackendConfig } from "../types/backend-config"

import {
  ARecord,
  CnameRecord,
  HostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53"

import {
  ApiGatewayDomain,
  CloudFrontTarget,
  UserPoolDomainTarget,
} from "aws-cdk-lib/aws-route53-targets"

import {
  BucketDeployment,
  CacheControl,
  Source,
} from "aws-cdk-lib/aws-s3-deployment"

import { App, CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib"
import path from "path"
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito"
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3"
import { COMMENTS_BUCKET, PAGES_TABLE } from "../constants"
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb"
import {
  CacheHeaderBehavior,
  CachePolicy,
  CloudFrontWebDistribution,
  Distribution,
  OriginProtocolPolicy,
  ViewerCertificate,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway"
import { DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager"
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"

export class WwwDotBenwainwrightDotMeStack extends Stack {
  public constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const domainName = "benwainwright.me"

    const pagesTable = new Table(this, `my-site-pages-table`, {
      partitionKey: {
        name: "slug",
        type: AttributeType.STRING,
      },
    })

    const deletePageFunction = new NodejsFunction(this, "delete-page", {
      environment: { [PAGES_TABLE]: pagesTable.tableName },
    })

    const updatePageFunction = new NodejsFunction(this, "update-page", {
      environment: { [PAGES_TABLE]: pagesTable.tableName },
    })

    const getPagesFunction = new NodejsFunction(this, "get-pages", {
      environment: { [PAGES_TABLE]: pagesTable.tableName },
    })

    const getPageFunction = new NodejsFunction(this, "get-page", {
      environment: { [PAGES_TABLE]: pagesTable.tableName },
    })

    pagesTable.grantReadWriteData(deletePageFunction)
    pagesTable.grantReadWriteData(updatePageFunction)
    pagesTable.grantReadData(getPagesFunction)
    pagesTable.grantReadData(getPageFunction)

    const pool = new UserPool(this, "user-pool", {
      selfSignUpEnabled: false,
    })

    const INDEX_DOT_HTML = "index.html"

    const bucket = new Bucket(this, "BensStaticWebsiteBucket", {
      bucketName: domainName,
      publicReadAccess: true,
      websiteIndexDocument: INDEX_DOT_HTML,
      websiteErrorDocument: INDEX_DOT_HTML,
      cors: [
        {
          allowedMethods: [HttpMethods.GET],
          allowedOrigins: [
            "http://localhost:8000",
            "https://benwainwright.me",
            "https://www.benwainwright.me",
          ],
          allowedHeaders: [`*`],
        },
      ],
    })

    const zone = HostedZone.fromLookup(this, "MyHostedZone", {
      domainName,
    })

    const certificate = new DnsValidatedCertificate(
      this,
      "BensWebsiteCertificate",
      {
        domainName,
        hostedZone: zone,
        subjectAlternativeNames: [`www.${domainName}`, `auth.${domainName}`],
      }
    )

    const userPoolDomain = pool.addDomain("user-pool-domain", {
      customDomain: {
        domainName: `auth.${domainName}`,
        certificate,
      },
    })

    const client = new UserPoolClient(this, "pool-client", {
      userPool: pool,
      oAuth: {
        flows: {
          implicitCodeGrant: true,
        },
        callbackUrls: [`https://${domainName}/`, `http://localhost:8000`],
      },
    })

    new ARecord(this, "a-record-for-cognito", {
      recordName: `auth.${domainName}`,
      zone,
      target: RecordTarget.fromAlias(new UserPoolDomainTarget(userPoolDomain)),
    })

    const apiCertificate = new DnsValidatedCertificate(this, "apiCertificate", {
      domainName: `api.${domainName}`,
      hostedZone: zone,
    })

    const cachePolicy = new CachePolicy(
      this,
      `include-origin-in-cache-key-policy`,
      {
        headerBehavior: CacheHeaderBehavior.allowList("origin"),
      }
    )

    const distribution = new Distribution(
      this,
      "BensWebsiteCloudfrontDistribution",
      {
        certificate,
        domainNames: [domainName, `www.${domainName}`],
        defaultBehavior: {
          cachePolicy,
          origin: new S3Origin(bucket),
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    )

    // eslint-disable-next-line unicorn/prefer-module
    const publicDir = path.join(__dirname, "..", "..", "public")

    const apiDomain = `api.${domainName}`

    const config: BackendConfig = {
      authSignInUrl: userPoolDomain.signInUrl(client, {
        redirectUri: `https://${domainName}/`,
      }),

      apiUrl: apiDomain,

      authSignInUrlForLocal: userPoolDomain.signInUrl(client, {
        redirectUri: `http://localhost:8000`,
      }),
      authSignOutUrl: userPoolDomain.signInUrl(client, {
        redirectUri: `https://${domainName}/`,
        signInPath: "/logout",
      }),
      authSignOutUrlForLocal: userPoolDomain.signInUrl(client, {
        redirectUri: `http://localhost:8000`,
        signInPath: "/logout",
      }),
    }

    new BucketDeployment(this, `bucket-deployment-for-everything-else`, {
      sources: [Source.asset(publicDir, { exclude: [INDEX_DOT_HTML] })],
      destinationBucket: bucket,
      distribution,
      cacheControl: [CacheControl.maxAge(Duration.days(365))],
      prune: false,
    })

    new BucketDeployment(this, `bucket-deployment-for-html`, {
      sources: [
        Source.asset(publicDir, {
          exclude: ["*.*", "!*.html"],
        }),
      ],
      destinationBucket: bucket,
      distribution,
      cacheControl: [CacheControl.noCache()],
      prune: false,
    })

    new BucketDeployment(this, "deployment", {
      destinationBucket: bucket,
      distribution,
      sources: [Source.jsonData("config.json", config)],
      prune: false,
    })

    new ARecord(this, "BensWebsiteBucketRecord", {
      zone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    })

    new CnameRecord(this, "BensWebsiteCnameRecord", {
      zone,
      domainName: "benwainwright.me",
      recordName: "www.benwainwright.me",
    })

    const commentsBucket = new Bucket(this, "comments-bucket")

    const commentsFunction = new NodejsFunction(this, "post-comment", {
      environment: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        [COMMENTS_BUCKET]: commentsBucket.bucketName,
      },
    })

    const listCommentsFunction = new NodejsFunction(this, "list-comments", {
      environment: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        [COMMENTS_BUCKET]: commentsBucket.bucketName,
      },
    })

    commentsBucket.grantWrite(commentsFunction)
    commentsBucket.grantRead(listCommentsFunction)

    const authorizer = new CognitoUserPoolsAuthorizer(this, `user-pool-auth`, {
      cognitoUserPools: [pool],
    })

    const api = new RestApi(this, "comments-api", {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
      },

      defaultMethodOptions: {
        authorizationType: AuthorizationType.COGNITO,
        authorizer,
      },
    })

    const pages = api.root.addResource("page")
    const page = pages.addResource("{slug}")

    pages.addMethod("POST", new LambdaIntegration(updatePageFunction))
    page.addMethod("PUT", new LambdaIntegration(updatePageFunction))
    page.addMethod("DELETE", new LambdaIntegration(deletePageFunction))

    page.addMethod("GET", new LambdaIntegration(getPageFunction))
    pages.addMethod("GET", new LambdaIntegration(getPagesFunction))

    const comments = api.root.addResource("comments")
    const comment = comments.addResource("{post_slug}")
    comment.addMethod("POST", new LambdaIntegration(commentsFunction))
    comment.addMethod("GET", new LambdaIntegration(listCommentsFunction))
    const apiDomainName = api.addDomainName("bens-website-api", {
      domainName: apiDomain,
      certificate: apiCertificate,
    })

    new ARecord(this, "ApiARecord", {
      zone,
      recordName: apiDomain,
      target: RecordTarget.fromAlias(new ApiGatewayDomain(apiDomainName)),
    })
  }
}
