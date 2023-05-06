import * as cdk from "aws-cdk-lib"
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import { BackendConfig } from "../types/backend-config"
import * as route53 from "aws-cdk-lib/aws-route53"
import * as route53Targets from "aws-cdk-lib/aws-route53-targets"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs"
import * as apiGateway from "aws-cdk-lib/aws-apigateway"
import * as certificateManager from "aws-cdk-lib/aws-certificatemanager"
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53"
import {
  ApiGatewayDomain,
  UserPoolDomainTarget,
} from "aws-cdk-lib/aws-route53-targets"
import {
  BucketDeployment,
  CacheControl,
  Source,
} from "aws-cdk-lib/aws-s3-deployment"
import { Duration } from "aws-cdk-lib"
import path from "path"
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito"
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3"

export class WwwDotBenwainwrightDotMeStack extends cdk.Stack {
  public constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const domainName = "benwainwright.me"

    const pagesTable = new dynamodb.Table(this, `my-site-pages-table`, {
      partitionKey: {
        name: "slug",
        type: dynamodb.AttributeType.STRING,
      },
    })

    const pool = new UserPool(this, "user-pool", {
      selfSignUpEnabled: false,
    })

    const bucket = new Bucket(this, "BensStaticWebsiteBucket", {
      bucketName: domainName,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
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

    const zone = route53.HostedZone.fromLookup(this, "MyHostedZone", {
      domainName,
    })

    const certificate = new certificateManager.DnsValidatedCertificate(
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

    const apiCertificate = new certificateManager.DnsValidatedCertificate(
      this,
      "apiCertificate",
      {
        domainName: `api.${domainName}`,
        hostedZone: zone,
      }
    )

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "BensWebsiteCloudfrontDistribution",
      {
        originConfigs: [
          {
            customOriginSource: {
              domainName: bucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          { aliases: [domainName, `www.${domainName}`] }
        ),
      }
    )

    // eslint-disable-next-line unicorn/prefer-module
    const publicDir = path.join(__dirname, "..", "..", "public")

    const config: BackendConfig = {
      authSignInUrl: userPoolDomain.signInUrl(client, {
        redirectUri: `https://${domainName}/`,
      }),

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
      sources: [Source.asset(publicDir, { exclude: ["*.html"] })],
      destinationBucket: bucket,
      distribution,
      cacheControl: [CacheControl.maxAge(Duration.days(365))],
      prune: false,
    })

    new BucketDeployment(this, `bucket-deployment-for-html`, {
      sources: [Source.asset(publicDir, { exclude: ["*", "!*.html"] })],
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

    new cdk.CfnOutput(this, "api-output", {
      exportName: "distribution",
      value: distribution.distributionId,
    })

    new route53.ARecord(this, "BensWebsiteBucketRecord", {
      zone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    })

    new route53.CnameRecord(this, "BensWebsiteCnameRecord", {
      zone,
      domainName: "benwainwright.me",
      recordName: "www.benwainwright.me",
    })

    const commentsBucket = new Bucket(this, "comments-bucket")

    const commentsFunction = new lambdaNodeJs.NodejsFunction(
      this,
      "post-comment",
      {
        environment: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          COMMENTS_BUCKET: commentsBucket.bucketName,
        },
      }
    )

    const listCommentsFunction = new lambdaNodeJs.NodejsFunction(
      this,
      "list-comments",
      {
        environment: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          COMMENTS_BUCKET: commentsBucket.bucketName,
        },
      }
    )

    commentsBucket.grantWrite(commentsFunction)
    commentsBucket.grantRead(listCommentsFunction)

    const api = new apiGateway.RestApi(this, "comments-api", {
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
      },
    })

    const comments = api.root.addResource("comments")

    const comment = comments.addResource("{post_slug}")

    comment.addMethod(
      "POST",
      new apiGateway.LambdaIntegration(commentsFunction)
    )

    comment.addMethod(
      "GET",
      new apiGateway.LambdaIntegration(listCommentsFunction)
    )

    const apiDomainName = api.addDomainName("bens-website-api", {
      domainName: `api.${domainName}`,
      certificate: apiCertificate,
    })

    new ARecord(this, "ApiARecord", {
      zone,
      recordName: `api.${domainName}`,
      target: RecordTarget.fromAlias(new ApiGatewayDomain(apiDomainName)),
    })
  }
}
