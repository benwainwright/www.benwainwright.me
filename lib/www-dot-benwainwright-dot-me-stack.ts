import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53Targets from "@aws-cdk/aws-route53-targets";
import * as cloudfront from "@aws-cdk/aws-cloudfront";

import { BlockPublicAccess } from "@aws-cdk/aws-s3";

export class WwwDotBenwainwrightDotMeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const [recordName, domainName] = ["www", "benwainwright.me"];

    const bucket = new s3.Bucket(this, "BensStaticWebsiteBucket", {
      bucketName: `${recordName}.${domainName}`,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

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
      }
    );

    const zone = new route53.HostedZone(this, "BensWebsiteBucket", {
      zoneName: `${recordName}.${domainName}`,
    });

    new route53.ARecord(this, "BensWebsiteBucketRecord", {
      zone,
      recordName,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    });
  }
}
