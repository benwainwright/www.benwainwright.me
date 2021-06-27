import { FC } from "react"
import { graphql } from "gatsby"
import { TiPencil } from "react-icons/ti"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import BlogSummary from "../components/blog-summary"
import HeadingOne from "../components/heading-one"

const Container = styled.main`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  padding: 0 2rem 0 2rem;
`

export interface BlogSummaryData {
  excerpt: string
  frontmatter: {
    date: string
    slug: string
    title: string
  }
}

interface BlogProps {
  data: {
    allMarkdownRemark: {
      nodes: BlogSummaryData[]
    }
  }
}

const Blog: FC<BlogProps> = props => {
  return (
    <Layout>
      <Container>
        <HeadingOne icon={TiPencil}>Blog</HeadingOne>
        {props.data.allMarkdownRemark.nodes.map(entry => (
          <BlogSummary entry={entry} key={entry.frontmatter.slug} />
        ))}
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
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
