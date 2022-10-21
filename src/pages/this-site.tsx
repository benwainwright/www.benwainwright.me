import styled from "@emotion/styled"
import React from "react"
import Anchor from "../components/anchor"
import HeadingOne from "../components/heading-one"
import HeadingTwo from "../components/heading-two"
import Layout from "../components/layout"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"

const Container = styled.div`
  padding: 0 2rem 0 2rem;
  max-width: 1000px;
  @media (min-width: 1400px) {
    margin: 0 auto;
    width: 70%;
  }
`
const ThisSite = () => (
  <Layout title="About this site">
    <Container>
      <HeadingOne>About This Site</HeadingOne>
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
      <HeadingTwo>Latest Pipeline Run</HeadingTwo>
      <ParagraphText>
        <img
          src="https://github-actions.40ants.com/benwainwright/www.benwainwright.me/matrix.svg?only=Deployment%20Pipeline"
          alt="Latest Pipeline Run"
        />
      </ParagraphText>
    </Container>
  </Layout>
)

export default ThisSite
