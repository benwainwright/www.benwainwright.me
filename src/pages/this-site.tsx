import styled from "@emotion/styled"
import React from "react"
import Anchor from "../components/anchor"
import HeadingThree from "../components/heading-three"
import HeadingTwo from "../components/heading-two"
import Layout from "../components/layout"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"

const Container = styled.div`
  padding: 0 2rem 0 2rem;
  @media (min-width: 1400px) {
    margin: 0 auto;
    width: 70%;
  }
`
const ThisSite = () => (
  <Layout>
    <Container>
      <HeadingTwo>About This Site</HeadingTwo>
      <ul>
        <ListItem>
          The source code for this site can be found{" "}
          <Anchor href="https://github.com/benwainwright/www.benwainwright.me">
            here
          </Anchor>
        </ListItem>
        <ListItem>
          This site is a statically generated website build using{" "}
          <Anchor href="https://www.gatsbyjs.com/">Gatsby</Anchor>,{" "}
          <Anchor href="https://www.typescriptlang.org/">TypeScript</Anchor> and{" "}
          <Anchor href="https://reacjs.org">React</Anchor>
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
          Although the website is generated statically, there is a comments api
          backed by{" "}
          <Anchor href="https://aws.amazon.com/apigateway/">
            AWS Api Gateway
          </Anchor>{" "}
          and <Anchor href="https://aws.amazon.com/lambda/">AWS Lambda</Anchor>{" "}
          that provides a way of recording post comments. This then gets added
          to the site everytime it is rebuilt
        </ListItem>
      </ul>
      <HeadingThree>Latest Pipeline Run</HeadingThree>
      <ParagraphText>
        <img src="https://github-actions.40ants.com/benwainwright/www.benwainwright.me/matrix.svg?only=Deployment%20Pipeline" />
      </ParagraphText>
    </Container>
  </Layout>
)

export default ThisSite
