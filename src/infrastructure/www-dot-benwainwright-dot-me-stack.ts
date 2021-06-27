import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as route53 from "aws-cdk-lib/aws-route53"
import * as route53Targets from "aws-cdk-lib/aws-route53-targets"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment"
import * as certificateManager from "aws-cdk-lib/aws-certificatemanager"

export class WwwDotBenwainwrightDotMeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const domainName = "benwainwright.me"

    const bucket = new s3.Bucket(this, "BensStaticWebsiteBucket", {
      bucketName: domainName,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    })

    const zone = route53.HostedZone.fromLookup(this, "MyHostedZone", {
      domainName,
    })

    const certificate = new certificateManager.DnsValidatedCertificate(
      this,
      "BensWebsiteCertificate",
      {
        domainName: `*.${domainName}`,
        hostedZone: zone,
      }
    )

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "BensWebsiteCloudfrontDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          { aliases: [domainName, `*.${domainName}`] }
        ),
      }
    )

    new route53.ARecord(this, "BensWebsiteBucketRecord", {
      zone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    })

    new s3Deploy.BucketDeployment(this, "BensWebsiteDeployment", {
      sources: [s3Deploy.Source.asset("./public")],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    })

    new route53.CnameRecord(this, "BensWebsiteCnameRecord", {
      zone,
      domainName: "benwainwright.me",
      recordName: "www.benwainwright.me",
    })
  }
}
