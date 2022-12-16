import React from "react"
import { Anchor, Heading, Layout, ListItem, ParagraphText } from "../components"
import * as styles from "./this-site.module.css"

const ThisSite = () => {
  return (
    <Layout title="About this site">
      <div className={styles.container}>
        <Heading level={1}>About This Site</Heading>
        <ul>
          <ListItem>
            The{" "}
            <Anchor href="https://github.com/benwainwright/www.benwainwright.me">
              source code for this site
            </Anchor>{" "}
            can be found on Github.
          </ListItem>
          <ListItem>
            This site is a statically generated website built using{" "}
            <Anchor href="https://www.gatsbyjs.com/">Gatsby</Anchor>,{" "}
            <Anchor href="https://www.typescriptlang.org/">TypeScript</Anchor>{" "}
            and <Anchor href="https://reacjs.org">React</Anchor>
          </ListItem>

          <ListItem>
            The application is primarily served from an{" "}
            <Anchor href="https://aws.amazon.com/s3/">AWS S3</Anchor> Bucket
            behind an{" "}
            <Anchor href="https://aws.amazon.com/cloudfront/">
              AWS CloudFront
            </Anchor>{" "}
            CDN, with DNS provided by{" "}
            <Anchor href="https://aws.amazon.com/route53/">AWS Route 53</Anchor>
          </ListItem>

          <ListItem>
            Although the website is generated statically, there is a comments
            api backed by{" "}
            <Anchor href="https://aws.amazon.com/apigateway/">
              AWS Api Gateway
            </Anchor>{" "}
            and{" "}
            <Anchor href="https://aws.amazon.com/lambda/">AWS Lambda</Anchor>{" "}
            that provides a way of recording post comments. This then gets added
            to the site everytime it is rebuilt
          </ListItem>
        </ul>
        <Heading level={2}>Latest Pipeline Run</Heading>
        <ParagraphText>
          <img
            src="https://github-actions.40ants.com/benwainwright/www.benwainwright.me/matrix.svg?only=Deployment%20Pipeline"
            alt="Latest Pipeline Run"
          />
        </ParagraphText>
      </div>
    </Layout>
  )
}

export default ThisSite
