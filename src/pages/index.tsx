import { FC } from "react"

import { graphql, Link } from "gatsby"
import { BsFillPersonFill } from "react-icons/bs"
import { FaPencilAlt } from "react-icons/fa"
import { FaMapSigns } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import mePhoto from "../assets/images/me.jpg"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"
import HeadingTwo from "../components/heading-two"
import HeadingOne from "../components/heading-one"
import Anchor from "../components/anchor"
import styled from "@emotion/styled"
import { BlogSummaryData } from "./blog"
import BlogSummary from "../components/blog-summary"

const Container = styled.main`
  grid-column-start: 2;
  grid-row-start: 2;
  padding: 0 2rem 0 2rem;
`

const DecorativePhoto = styled.img`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  object-position: top;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

interface IndexProps {
  data: {
    allMarkdownRemark: {
      nodes: BlogSummaryData[]
    }
  }
}

const IndexPage: FC<IndexProps> = props => {
  const entry = props.data.allMarkdownRemark.nodes[0]
  return (
    <Layout>
      <DecorativePhoto src={mePhoto} alt="Ben sitting on a stone bench" />
      <Container>
        <Seo title="Home" />
        <HeadingOne>
          <BsFillPersonFill style={{ marginRight: "0.5rem" }} />
          About Me
        </HeadingOne>
        <ParagraphText>
          Full stack TypeScript/JavaScript engineer with experience in AWS
          services and a variety of other programming languages and web
          technologies. I currently work for{" "}
          <Anchor href="https://www.cinch.co.uk/">Cinch Cars</Anchor> in
          Manchester.
        </ParagraphText>
        <HeadingTwo>
          <FaPencilAlt style={{ marginRight: "0.5rem" }} />
          Latest Blog Post
        </HeadingTwo>
        <ul>
          <li>
            <ParagraphText>
              <Link to={`/blog/${entry.frontmatter.slug}`}>
                {entry.frontmatter.title}
              </Link>
            </ParagraphText>
          </li>
        </ul>
        <HeadingTwo>
          <FaMapSigns style={{ marginRight: "0.5rem" }} />
          Find me elsewhere
        </HeadingTwo>
        <ul>
          <ListItem>
            <Anchor href="https://github.com/benwainwright">Github</Anchor>
          </ListItem>
          <ListItem>
            <Anchor href="https://www.linkedin.com/in/benwainwright">
              LinkedIn
            </Anchor>
          </ListItem>
        </ul>
        <HeadingTwo>
          <HiOutlineMail style={{ marginRight: "0.5rem" }} />
          Get in touch
        </HeadingTwo>
        <ParagraphText>
          You can reach me on{" "}
          <Anchor href="mailto:bwainwright28@gmail.com">
            bwainwright28@gmail.com
          </Anchor>
          . Please note that I'm happilly employed at this time; recruiters will
          probably be ignored.
        </ParagraphText>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date }, limit: 1) {
      nodes {
        excerpt
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
        }
      }
    }
  }
`

export default IndexPage
